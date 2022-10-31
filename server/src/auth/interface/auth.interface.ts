import { User } from '@prisma/client';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: Pick<User, 'id' | 'email'>;
}
