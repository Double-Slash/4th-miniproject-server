import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Swagger UI

/* Login DTO */
export class LoginDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  password: string;
}
