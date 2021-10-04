import bcrypt from 'bcrypt';

import User from '@components/user/user.model';
import ApiError from '@shared/utils/ApiError';
import { IUser, IUserModal } from '@components/user/users.interface';
import { IDataStoredInToken, ITokenData, IUserBody } from './auth.interface';
// import RenameText from '@components/user/bipintest.model';

export default {
  async signup(userData: IUserBody): Promise<IUser> {
    const user: IUser = await User.findOne({ email: userData.email });
    // const b = await RenameText.create({});
    if (user) throw new ApiError(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser: IUser = await User.create({ ...userData, password: hashedPassword });

    return newUser;
  },

  async login(userData: IUserBody): Promise<IUser> {
    const findUser: IUserModal = await User.findOne({ email: userData.email });
    if (!findUser) throw new ApiError(409, 'Incorrect email or password');

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new ApiError(409, 'Incorrect email or password');

    const user = {
      _id: findUser._id,
      email: findUser.email,
    };

    return user;
  },

  async logout(userData: IUser): Promise<IUser> {
    const findUser: IUser = await User.findOne({ email: userData.email });
    if (!findUser) throw new ApiError(409, `Your email ${userData.email} not found`);

    return findUser;
  },
};
