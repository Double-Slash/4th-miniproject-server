import { IsNotEmpty } from 'class-validator';

/* Login DTO */
export class LoginDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  password: string;
}
