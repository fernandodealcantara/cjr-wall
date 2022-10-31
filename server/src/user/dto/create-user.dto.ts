import { PickType } from '@nestjs/mapped-types'
import { UserEntity } from '../entity/user.entity';

export class CreateUserDto extends PickType(UserEntity, [
  'email',
  'name',
  'picture',
  'id',
]) {}
