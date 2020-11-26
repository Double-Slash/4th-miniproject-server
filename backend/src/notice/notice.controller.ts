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
import { returnPaginationedList } from '../utils/pagination.util';
import { AnyFilesInterceptor } from '@nestjs/platform-express'; // Multer Module
import { diskStorage } from 'multer'; // Multer Module

/* http://"IP":3000/api/notice/... */
@Controller('api/notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  /* api/notice/all?index=0 */
  @Get('all')
  async getAllNotice(@Param('index') index, @Res() res) {
    const notices = await this.noticeService.findAll();
    const pagedNotices = returnPaginationedList(notices, index);
    if (pagedNotices.length == 0) {
      res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: 'Notice List does not exist', body: pagedNotices });
    } else {
      res
        .status(HttpStatus.OK)
        .json({ message: 'Notice List exists', body: pagedNotices });
    }
  }

  /* api/notice/action?index=0 */
  @Get('action')
  async getActionNotice(@Param('index') index, @Res() res) {
    const notices = await this.noticeService.findAction();
    const pagedNotices = returnPaginationedList(notices, index);
    if (pagedNotices.length == 0) {
      res.status(HttpStatus.NO_CONTENT).json({
        message: 'Action Notice List does not exist',
        body: pagedNotices,
      });
    } else {
      res
        .status(HttpStatus.OK)
        .json({ message: 'Action Notice List exists', body: pagedNotices });
    }
  }

  /* api/notice/"imgpath" */
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.status(HttpStatus.OK).sendFile(image, { root: './files' });
  }

  /* api/notice/upload */
  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  async uploadNotice(
    @Body() noticeDto: NoticeDto,
    @UploadedFiles() files,
    @Res() res,
  ) {
    Logger.log(returnUploadFileNameList(files));
    noticeDto.uploadFileList = returnUploadFileNameList(files);
    await this.noticeService.create(noticeDto);
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'Notice updated successfully' });
  }
}
