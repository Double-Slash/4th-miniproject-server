import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Swagger UI

/* Notice DTO */
export class NoticeDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  timestamp: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  type: number;

  @ApiProperty({ type: [String] })
  uploadFileList: Array<string>;
}
