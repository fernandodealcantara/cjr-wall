import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthRequest } from '../auth/interface';
import { ProfileService } from '../profile/profile.service';
import { SaveProfileDto } from './dto/save-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return await this.profileService.getProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async saveProfile(
    @Req() req: AuthRequest,
    @Body() saveProfileDto: SaveProfileDto,
  ) {
    return await this.profileService.save(req.user.id, saveProfileDto);
  }
}
