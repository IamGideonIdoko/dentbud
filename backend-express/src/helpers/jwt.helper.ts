import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import constants from '../config/constants.config';
import createError from 'http-errors';
import { addRefreshTokenToDb, getRefreshTokenFromDb } from '../helpers/token.helper';

interface JwtCustomPayload {
  id: string;
}

/*  */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signAccessToken = async (payload: JwtCustomPayload): Promise<string | undefined> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, constants.accessTokenSecret, { expiresIn: constants.accessTokenSpan }, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
};

export const signRefreshToken = async (payload: JwtCustomPayload): Promise<string | undefined> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, constants.refreshTokenSecret, { expiresIn: constants.refreshTokenSpan }, async (err, token) => {
      if (err) reject(err);
      try {
        if (token) await addRefreshTokenToDb(payload.id, token);
        resolve(token as string);
      } catch (err) {
        reject(err);
      }
    });
  });
};

export const verifyAccessToken = async (accessToken: string): Promise<string | JwtPayload | undefined> => {
  return new Promise<string | JwtPayload | undefined>((resolve, reject) => {
    jwt.verify(accessToken, constants.accessTokenSecret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verifyRefreshToken = async (refreshToken: string): Promise<any> => {
  return new Promise<string | JwtPayload | undefined>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(refreshToken, constants.refreshTokenSecret, async (err, decoded: any) => {
      if (err) return reject(err);
      try {
        /* fetch token */
        const value = await getRefreshTokenFromDb(decoded?.id);
        if (refreshToken === value) return resolve(decoded);
        reject(new createError.Unauthorized());
      } catch (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};
