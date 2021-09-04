import jwt from 'jsonwebtoken';

import config from '@shared/config';
import User from '@components/user/user.model';
import { ObjectId } from 'mongodb';
import { IUser } from '@/components/user/users.interface';
import { IDataStoredInToken } from '@/components/auth/auth.interface';

export default {
  generateToken(userId: ObjectId, expires: Date, type: string, secret: string = config.jwt.secret): string {
    const payload = {
      sub: userId,
      // iat: moment().unix(),
      // exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  },

  /**
   * Save a token
   * @param {string} token
   * @param {ObjectId} userId
   * @param {Moment} expires
   * @param {string} type
   * @param {boolean} [blacklisted]
   * @returns {Promise<Token>}
   */
  async saveToken(token: string, userId: ObjectId, expires: Date, type: string, blacklisted: Boolean = false) {
    const tokenDoc = await User.create({
      token,
      user: userId,
      // expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  },

  async verifyToken(token: string, type: string) {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await User.findOne({ token, type, user: payload.sub, blacklisted: false });
    if (!tokenDoc) {
      throw new Error('Token not found');
    }
    return tokenDoc;
  },

  generateAuthTokens(user: IUser): string {
    const dataStoredInToken: IDataStoredInToken = { _id: user._id };
    const secretKey: string = "config.get('secretKey')";
    const expiresIn: number = 60 * 60;

    return jwt.sign(dataStoredInToken, secretKey, { expiresIn });
  },
};
