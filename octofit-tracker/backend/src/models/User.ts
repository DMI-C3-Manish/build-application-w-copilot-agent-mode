import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  teamId?: mongoose.Types.ObjectId;
  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  joinedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', userSchema);
