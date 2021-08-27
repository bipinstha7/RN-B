import bcrypt from 'bcrypt';

import User from '@/models/user.model';
import ApiError from '@/utils/ApiError';
import { IUser, IUserModal } from '@interfaces/users.interface';
import { IDataStoredInToken, ITokenData, IUserBody } from '@interfaces/auth.interface';

export const signup = async (userData: IUserBody): Promise<IUser> => {
  const user: IUser = await User.findOne({ email: userData.email });
  if (user) throw new ApiError(409, `Your email ${userData.email} already exists`);

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser: IUser = await User.create({ ...userData, password: hashedPassword });

  return newUser;
};

export const login = async (userData: IUserBody): Promise<IUser> => {
  const findUser: IUserModal = await User.findOne({ email: userData.email });
  if (!findUser) throw new ApiError(409, 'Incorrect email or password');

  const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
  if (!isPasswordMatching) throw new ApiError(409, 'Incorrect email or password');

  const user = {
    _id: findUser._id,
    email: findUser.email,
  };

  return user;
};

export const logout = async (userData: IUser): Promise<IUser> => {
  const findUser: IUser = await User.findOne({ email: userData.email });
  if (!findUser) throw new ApiError(409, `Your email ${userData.email} not found`);

  return findUser;
};
