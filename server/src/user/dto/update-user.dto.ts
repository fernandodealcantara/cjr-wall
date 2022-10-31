import { PickType, PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entity/user.entity';

export class UpdateUserDto extends PartialType(
  PickType(UserEntity, ['name', 'picture', 'email']),
) {}
