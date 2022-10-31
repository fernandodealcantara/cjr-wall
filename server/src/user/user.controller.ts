import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthRequest } from '../auth/interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: AuthRequest) {
    const user = await this.userService.getUser(req.user.id);
    
    if (!user) throw new NotFoundException();

    return user;
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }
}
