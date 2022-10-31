import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SaveProfileDto } from './dto/save-profile.dto';

const publicProfileFields = {
  id: true,
  department: true,
  content: true,
  github: true,
  instagram: true,
  linkedin: true,
  twitter: true,
  user: {
    select: {
      name: true,
      picture: true,
    },
  },
};

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  async getProfile(userId: string) {
    return await this.prismaService.profile.findUniqueOrThrow({
      where: { userId },
      select: publicProfileFields,
    });
  }

  async save(userId: string, saveProfileDto: SaveProfileDto) {
    return await this.prismaService.profile.upsert({
      where: { userId },
      update: saveProfileDto,
      create: { userId, ...saveProfileDto },
      select: publicProfileFields,
    });
  }
}
