import jwt from 'jsonwebtoken';

import config from '@/config';
import User from '@models/user.model';
import { ObjectId } from 'mongodb';
import { IUser } from '@/interfaces/users.interface';
import { IDataStoredInToken } from '@/interfaces/auth.interface';

export const generateToken = (
  userId: ObjectId,
  expires: Date,
  type: string,
  secret: string = config.jwt.secret,
): string => {
  const payload = {
    sub: userId,
    // iat: moment().unix(),
    // exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
export const saveToken = async (
  token: string,
  userId: ObjectId,
  expires: Date,
  type: string,
  blacklisted: Boolean = false,
) => {
  const tokenDoc = await User.create({
    token,
    user: userId,
    // expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

export const verifyToken = async (token: string, type: string) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await User.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

export const generateAuthTokens = (user: IUser): string => {
  // await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  // return {
  //   access: {
  //     token: accessToken,
  //     expires: accessTokenExpires.toDate(),
  //   },
  // };

  const dataStoredInToken: IDataStoredInToken = { _id: user._id };
  const secretKey: string = "config.get('secretKey')";
  const expiresIn: number = 60 * 60;

  // return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  return jwt.sign(dataStoredInToken, secretKey, { expiresIn });
};
