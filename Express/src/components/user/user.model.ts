import validator from 'validator';
import { model, Schema, Document } from 'mongoose';

import { IUserModal } from '@components/user/users.interface';

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
  },
  // USE SNAKE CASE METHOD
  {
    timestamps: true,
  },
);

const userModel = model<IUserModal & Document>('User', userSchema);

export default userModel;
