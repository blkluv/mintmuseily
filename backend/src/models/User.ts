import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, unique: true },
  email: { type: String, unique: true, sparse: true },
  credits: { type: Number, default: 25 },
  role: { type: String, enum: ['free', 'monthly', 'yearly'], default: 'free' }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)
export interface UserDocument extends mongoose.Document {
  walletAddress: string
  email: string
  credits: number
  role: 'free' | 'monthly' | 'yearly'
  createdAt: Date
  updatedAt: Date
}
export interface UserModel extends mongoose.Model<UserDocument> {
  findByWalletAddress(walletAddress: string): Promise<UserDocument | null>
  findByEmail(email: string): Promise<UserDocument | null>
  findById(id: string): mongoose.Query<UserDocument | null, UserDocument>
  deductCredits(userId: string, credits: number): Promise<UserDocument | null>
  addCredits(userId: string, credits: number): Promise<UserDocument | null>
  updateRole(userId: string, role: 'free' | 'monthly' | 'yearly'): Promise<UserDocument | null>
  getCredits(userId: string): Promise<number | null>
  getRole(userId: string): Promise<'free' | 'monthly' | 'yearly' | null>
  getUserById(userId: string): Promise<UserDocument | null>}