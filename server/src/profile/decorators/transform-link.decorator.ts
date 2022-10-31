import { Transform } from 'class-transformer';

export function TransformSetHttpsPrefix() {
  return Transform(({ value }) => {
    if (value && !value.startsWith('https://')) {
      return `https://${value}`;
    }
    return value;
  });
}
