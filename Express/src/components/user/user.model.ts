import validator from 'validator';
import { model, Schema, Document } from 'mongoose';

import { IUserModal } from '@components/user/users.interface';

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, 'Email is required'],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password is required'],
      minlength: [15, 'Password must be more than 15 characters'],
    },
  },
  // USE SNAKE CASE METHOD
  {
    timestamps: true,
  },
);

const userModel = model<IUserModal & Document>('User', userSchema);

export default userModel;
