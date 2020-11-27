import { IsNotEmpty } from 'class-validator';

/* Notice DTO */
export class NoticeDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  timestamp: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  type: number;

  uploadFileList: Array<string>;
}
