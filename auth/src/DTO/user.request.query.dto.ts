import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayNotEmpty, IsInt } from 'class-validator';

export class UserRequestQueryDto {
  // Accept comma-separated ids: ?ids=1,2,3
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value
          .split(',')
          .map((v) => Number(v.trim()))
          .filter((v) => Number.isFinite(v))
      : Array.isArray(value)
        ? value.map((v) => Number(v)).filter((v) => Number.isFinite(v))
        : [],
  )
  @ArrayNotEmpty()
  @ArrayMaxSize(200)
  @IsInt({ each: true })
  ids!: number[];
}
