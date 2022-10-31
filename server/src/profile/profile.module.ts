import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [PrismaModule],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
