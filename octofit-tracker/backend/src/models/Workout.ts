import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  difficulty: string;
  duration: number;
  description: string;
  suggestedAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String },
  suggestedAt: { type: Date, default: Date.now }
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
