import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../src/prisma/prisma.service';
import * as cookieParser from 'cookie-parser';

describe('App (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let instanceSuperTest: request.SuperAgentTest;
  let access_token: string;
  let user: CreateUserDto = {
    id: '112345683233214050543',
    email: 'john.1@doe.com',
    name: 'John Doe',
    picture: null,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AuthService,
        UserService,
        JwtService,
        ConfigService,
        PrismaService,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    authService = moduleRef.get<AuthService>(AuthService);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();

    jest
      .spyOn(authService, 'parseGoogleIdToken')
      .mockImplementation((_token) => {
        return Promise.resolve(user);
      });

    instanceSuperTest = request.agent(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/google (POST) - should return 200', async () => {
    const { status, body, header } = await instanceSuperTest
      .post('/auth/google')
      .send({
        token: 'token',
      });

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
        expires_in: expect.any(Number),
        user: {
          id: expect.any(String),
          email: expect.any(String),
          name: expect.any(String),
          picture: null,
        },
      }),
    );
    expect(header['set-cookie']).toEqual(
      expect.arrayContaining([expect.any(String)]),
    );
  });

  it('/auth/refresh (GET) - should return 200', async () => {
    const { status, body } = await instanceSuperTest.get('/auth/refresh');

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
        expires_in: expect.any(Number),
      }),
    );

    access_token = body.access_token;
  });

  it('/auth/logout (POST) - should return 401', async () => {
    const { status } = await instanceSuperTest.post('/auth/logout');

    expect(status).toBe(401);
  });

  it('/auth/logout (POST) - should return 200', async () => {
    const { status } = await instanceSuperTest
      .post('/auth/logout')
      .set('Authorization', `Bearer ${access_token}`);

    expect(status).toBe(200);
  });

  it('/profile/userId (GET) - should return 200', async () => {
    const { status, body } = await instanceSuperTest.get(`/profile/${user.id}`);

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        department: null,
        content: expect.any(String),
        github: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        user: { name: expect.any(String), picture: null },
      }),
    );
  });

  it('/profile (POST) - should return 200', async () => {
    const { status, body } = await instanceSuperTest
      .post('/profile')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        department: 'NDP',
        content: 'I am a Student',
        github: '',
      });

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        department: expect.any(String),
        content: 'I am a Student',
        github: expect.any(String),
        instagram: expect.any(String),
        linkedin: expect.any(String),
        twitter: expect.any(String),
        user: { name: expect.any(String), picture: null },
      }),
    );
  });

  it('/users/me (GET) - should return 200', async () => {
    const { status, body } = await instanceSuperTest
      .get('/users/me')
      .set('Authorization', `Bearer ${access_token}`);

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
        picture: null,
      }),
    );
  });

  it('/users (GET) - should return 200', async () => {
    const { status, body } = await instanceSuperTest.get('/users');

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          picture: null,
          profile: {
            department: expect.any(String),
          },
        }),
      ]),
    );
  });
});
