import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly isbn: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly publisher: string;
}
