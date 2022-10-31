import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';

export function TransformDate() {
  return Transform(({ value }) => {
    try {
      return new Date(value);
    } catch (error) {
      throw new BadRequestException('Invalid date');
    }
  });
}
