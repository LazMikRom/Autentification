import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getOneUser(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
