import { PartialType, PickType } from '@nestjs/mapped-types';
import { ProfileEntity } from '../entity/profile.entity';

export class SaveProfileDto extends PartialType(
  PickType(ProfileEntity, [
    'instagram',
    'linkedin',
    'twitter',
    'github',
    'content',
    'department'
  ]),
) {}
