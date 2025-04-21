import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hashedPassword, plan: 'free', credits: 25 })
    res.status(201).json({ user, token: jwt.sign({ id: user._id }, JWT_SECRET) })
  } catch (error) {
    res.status(400).json({ error: 'Signup failed' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ error: 'User not found' })
    const isMatch = await bcrypt.compare(password, user.password as string)
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })
    res.status(200).json({ user, token: jwt.sign({ id: user._id }, JWT_SECRET) })
  } catch (error) {
    res.status(400).json({ error: 'Login failed' })
  }
}

export const walletLogin = async (req: Request, res: Response) => {
  try {
    const { address, signature, message } = req.body
    // Ideally, verify the signature here; for now, we assume it is valid.
    let user = await User.findOne({ walletAddress: address })
    if (!user) {
      user = await User.create({ walletAddress: address, plan: 'free', credits: 25 })
    }
    res.status(200).json({ user, token: jwt.sign({ id: user._id }, JWT_SECRET) })
  } catch (error) {
    res.status(400).json({ error: 'Wallet login failed' })
  }
}

// Add a getMe handler to allow fetching the user's profile.
// In a production app, you would verify the JWT token and then return user data.
export const getMe = async (req: Request, res: Response) => {
  try {
    // For now, just a stub response.
    // You might extract user ID from req.user (after middleware authentication) in a complete solution.
    res.status(200).json({ message: 'User profile', user: {} })
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user profile' })
  }
}
