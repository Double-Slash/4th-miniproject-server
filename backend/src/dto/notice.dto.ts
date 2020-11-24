export class NoticeDto {
  id: number;
  title: string;
  timestamp: string;
  desc: string;
  type: number;
  uploadFileList: Array<string>;
}
