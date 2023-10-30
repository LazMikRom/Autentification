import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/user/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PassportModule, UsersModule],
})
export class AuthModule {}
