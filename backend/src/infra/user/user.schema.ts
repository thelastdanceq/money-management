import { Schema } from 'mongoose';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  picture: { type: String, required: true },
});
