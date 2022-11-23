import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import ILogin from './interfaces';
import HttpException from './Error';

config();

export default class Token {
  static generateToken(login: ILogin): string {
    const result = sign({ email: login.email, id: login.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return result;
  }

  static tokenValidation(token: string) {
    try {
      const data = verify(token, process.env.JWT_SECRET as string);
      return data as JwtPayload;
    } catch (err) {
      throw new HttpException(401, 'Expired or invalid Token');
    }
  }
}
