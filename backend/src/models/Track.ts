import mongoose, { Schema, Document } from 'mongoose';

export interface ITrack extends Document {
  genre: string;
  artist: string;
  length: number;
  user: string;
  videoStyle: string;
  sample: boolean;
  trackData: any;
}

const TrackSchema: Schema = new Schema({
  genre: { type: String, required: true },
  artist: { type: String, required: true },
  length: { type: Number, required: true },
  user: { type: String, required: true },
  videoStyle: { type: String, required: false },
  sample: { type: Boolean, required: true },
  trackData: { type: Schema.Types.Mixed, required: true },
});

const Track = mongoose.model<ITrack>('Track', TrackSchema);
export default Track;
