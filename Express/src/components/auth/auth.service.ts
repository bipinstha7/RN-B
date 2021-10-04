import bcrypt from 'bcrypt';

import User from '@components/user/user.model';
import ApiError from '@shared/utils/ApiError';
import { IUser, IUserModal } from '@components/user/users.interface';
import { IDataStoredInToken, ITokenData, IUserBody, IUserName } from './auth.interface';
// import RenameText from '@components/user/bipintest.model';

export default {
  async signup(userData: IUserBody): Promise<IUserName> {
    const user = await User.findOne();

    /* If there is any user already registered, don't allow any other users */
    if (user) throw new ApiError(409, 'Something went wrong.');

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const newUser = await User.create({ ...userData, password: hashedPassword });

    return { name: newUser.name };
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
