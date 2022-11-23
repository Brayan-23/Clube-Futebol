import { compareSync } from 'bcryptjs';
import HttpException from '../utils/Error';
import Token from '../utils/token.util';
import User from '../database/models/UserModel';

export default class LoginService {
  private static validatePassword(user: User | null, password: string) {
    if (!user || !compareSync(password, user.password)) {
      throw new HttpException(401, 'Incorrect email or password');
    }
  }

  static async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ where: { email } });
    LoginService.validatePassword(user, password);
    const token = Token.generateToken({ id: user?.id, password, email });
    return token;
  }

  static async LoginValidate(token: string) {
    const data = Token.tokenValidation(token);
    const person = await User.findOne({ where: { id: data.id } });
    return person?.role;
  }
}
