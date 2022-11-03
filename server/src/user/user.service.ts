import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
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

  async setRefreshTokenId(id: string, currentRefreshTokenId: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: { currentRefreshTokenId },
      select: { id: true, email: true },
    });
  }

  async verifyRefreshTokenId(id: string, refreshTokenId: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });

    if (user.currentRefreshTokenId !== refreshTokenId) {
      throw new UnauthorizedException('Refresh token is not valid');
    }

    return { id: user.id, email: user.email };
  }

  async removeRefreshTokenId(id: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: { currentRefreshTokenId: null },
      select: { id: true, email: true },
    });
  }
}
