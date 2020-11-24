import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeDto } from '../dto/notice.dto';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get('all')
  async getAllNotice() {
    const notices = await this.noticeService.findAll();
    return notices;
  }

  @Post('upload')
  async uploadNotice(@Body() noticeDto: NoticeDto) {
    const notice = await this.noticeService.create(noticeDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Notice updated successfully',
      notice: notice,
    };
  }
}
