import { User } from '../models/User'

export const getUserById = async (id: string) => {
  return await User.findById(id)
}

export const getUserByWallet = async (wallet: string) => {
  return await User.findOne({ walletAddress: wallet.toLowerCase() })
}

export const createUser = async (wallet: string | null, email: string | null) => {
  return await User.create({
    walletAddress: wallet?.toLowerCase() || undefined,
    email: email || undefined,
    credits: 25,
    role: 'free',
  })
}
export const updateUser = async (id: string, data: Partial<{ email: string; credits: number; role: 'free' | 'monthly' | 'yearly' }>) => {
  return await User.findByIdAndUpdate(id, data, { new: true })}