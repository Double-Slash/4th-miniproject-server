import { IsNotEmpty } from 'class-validator';

export class NoticeDto {
  @IsNotEmpty()
  id: string;

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
