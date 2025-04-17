import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  email?: string
  password?: string
  walletAddress?: string
  plan: 'free' | 'monthly' | 'yearly'
  credits: number
}

const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  walletAddress: { type: String, unique: true, sparse: true },
  plan: { type: String, enum: ['free', 'monthly', 'yearly'], default: 'free' },
  credits: { type: Number, default: 25 } // Free users get 25 weekly credits by default
})

export default mongoose.model<IUser>('User', UserSchema)
