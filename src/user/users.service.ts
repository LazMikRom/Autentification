import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(user: Partial<User>) {
    const hashedPassword = this.hashPassword(user.password);
    return await this.prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        role: ['user'],
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  // async getOneUser(idOrEmail: string) {
  //   return await this.prisma.user.findFirst({
  //     where: {
  //       OR: [{ email: idOrEmail }, { id: +idOrEmail }],
  //     },
  //   });
  // }

  async getOneUser(idOrEmail: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: idOrEmail,
      },
    });
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
