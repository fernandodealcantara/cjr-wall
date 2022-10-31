import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { OAuth2Client } from 'google-auth-library';
import { TokenPayload } from './interface/token.interface';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateCookieForLogOut() {
    return 'Refresh=; HttpOnly; Path=/; SameSite=None; Secure; Max-Age=0';
  }

  generateJwtAccessToken(id: string, email: string) {
    const payload: TokenPayload = { sub: id, email };
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return {
      access_token,
      expires_in: Number(
        this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      ),
    };
  }

  generateCookieWithJwtRefreshToken(id: string, email: string) {
    const payload: TokenPayload = { sub: id, email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const cookie = `Refresh=${token}; HttpOnly; Path=/; SameSite=None; Secure; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;

    return { token, cookie };
  }

  async googleValidate(token: string) {
    try {
      const createUserDto = await this.parseGoogleIdToken(token);

      const user = await this.userService.getUser(createUserDto.id);

      if (!user) {
        const newUser = await this.userService.create(createUserDto);

        return newUser;
      }

      const { id, ...updateUserDto }: { id: string } & UpdateUserDto =
        createUserDto;

      const updatedUser = await this.userService.update(id, updateUserDto);

      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new HttpException('Something went wrong', 500);
    }
  }

  async parseGoogleIdToken(token: string): Promise<CreateUserDto> {
    const client = new OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: this.configService.get('GOOGLE_CLIENT_ID'),
    });

    const { email, name, picture, sub } = ticket.getPayload();

    return { email, name, picture, id: sub };
  }
}
