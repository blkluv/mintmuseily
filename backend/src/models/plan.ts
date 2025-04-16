import mongoose, { Document, Schema } from 'mongoose'

export interface IPlan extends Document {
  name: string
  description: string
  price: number
  credits: number
}

const PlanSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  credits: { type: Number, required: true }
})

export default mongoose.model<IPlan>('Plan', PlanSchema)
