import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  Logger,
  Res,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeDto } from '../dto/notice.dto';
import {
  editFileName,
  returnUploadFileNameList,
} from '../utils/file.filter.util';
import { AnyFilesInterceptor } from '@nestjs/platform-express'; // Multer Module
import { diskStorage } from 'multer'; // Multer Module

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get('all')
  async getAllNotice() {
    const notices = await this.noticeService.findAll();
    return notices;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  async uploadNotice(@Body() noticeDto: NoticeDto, @UploadedFiles() files) {
    Logger.log(returnUploadFileNameList(files));
    noticeDto.uploadFileList = returnUploadFileNameList(files);
    const notice = await this.noticeService.create(noticeDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Notice updated successfully',
      notice: notice,
    };
  }
}
