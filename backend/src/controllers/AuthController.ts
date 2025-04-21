import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import vault from 'node-vault';
import User from '../models/User';

// Initialize Vault client
const vaultClient = vault({
  endpoint: 'http://127.0.0.1:8200', // Replace with your Vault server address
  token: 'your-root-token',         // Use a secure method to handle the token
});

// Function to get secrets from Vault
const getJWTSecret = async (): Promise<string> => {
  try {
    const secret = await vaultClient.read('secrets/mintmuseily');
    return secret.data.JWT_SECRET;
  } catch (error) {
    console.error('Error fetching JWT_SECRET from Vault:', error);
    throw new Error('Failed to retrieve JWT_SECRET');
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      plan: 'free',
      credits: 25,
    });

    const JWT_SECRET = await getJWTSecret(); // Fetch secret from Vault

    res.status(201).json({
      user,
      token: jwt.sign({ id: user._id }, JWT_SECRET),
    });
  } catch (error) {
    res.status(400).json({ error: 'Signup failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const JWT_SECRET = await getJWTSecret(); // Fetch secret from Vault

    res.status(200).json({
      user,
      token: jwt.sign({ id: user._id }, JWT_SECRET),
    });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};
