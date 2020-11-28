import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Swagger UI

/* Review DTO */
export class ReviewDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  review: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ type: String })
  profileUrl: string;
}
