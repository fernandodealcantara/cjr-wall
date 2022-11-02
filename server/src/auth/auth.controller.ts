import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtRefreshTokenGuard } from './guard/jwt-refresh-token.guard';
import { AuthRequest } from './interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('google')
  @HttpCode(HttpStatus.OK)
  async googleLogin(@Req() req: Request, @Body('token') token: string) {
    const user = await this.authService.googleValidate(token);
    const { access_token, expires_in } =
      this.authService.generateJwtAccessToken(user.id, user.email);

    const refreshToken = this.authService.generateCookieWithJwtRefreshToken(
      user.id,
      user.email,
    );

    await this.userService.setRefreshTokenId(user.id, refreshToken.jti);

    req.res.setHeader('Set-Cookie', refreshToken.cookie);

    return { access_token, expires_in, user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: AuthRequest) {
    await this.userService.removeRefreshTokenId(req.user.id);
    const cookie = this.authService.generateCookieForLogOut();

    req.res.setHeader('Set-Cookie', cookie);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: AuthRequest) {
    const { access_token, expires_in } =
      this.authService.generateJwtAccessToken(req.user.id, req.user.email);

    const refreshToken = this.authService.generateCookieWithJwtRefreshToken(
      req.user.id,
      req.user.email,
    );

    await this.userService.setRefreshTokenId(req.user.id, refreshToken.jti);

    req.res.setHeader('Set-Cookie', refreshToken.cookie);

    return { access_token, expires_in };
  }
}
