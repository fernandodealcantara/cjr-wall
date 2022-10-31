import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

const publicUserFields = {
  id: true,
  name: true,
  email: true,
  picture: true,
};

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: publicUserFields,
    });
  }

  async getUsers() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        picture: true,
        profile: {
          select: {
            department: true,
          },
        },
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        ...createUserDto,
        profile: {
          create: {
            content: `### Bem vindo ao CJR Wall! ${createUserDto.name}!`,
          },
        },
      },
      select: publicUserFields,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      select: publicUserFields,
    });
  }

  async setRefreshToken(id: string, currentRefreshToken: string) {
    const currentRefreshTokenHash = await bcrypt.hash(
      currentRefreshToken,
      await bcrypt.genSalt(),
    );

    return await this.prismaService.user.update({
      where: { id },
      data: { currentRefreshToken: currentRefreshTokenHash },
      select: { id: true, email: true },
    });
  }

  async verifyRefreshToken(id: string, refreshToken: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });

    if (
      !user?.currentRefreshToken ||
      !(await bcrypt.compare(refreshToken, user.currentRefreshToken))
    ) {
      throw new UnauthorizedException('Refresh token is not valid');
    }

    return { id: user.id, email: user.email };
  }

  async removeRefreshToken(id: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: { currentRefreshToken: null },
      select: { id: true, email: true },
    });
  }
}
