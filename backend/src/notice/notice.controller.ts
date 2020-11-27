import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UsePipes,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  Logger,
  Res,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeDto } from '../dto/notice.dto';
import { FilesDto } from '../dto/files.dto';
import {
  editFileName,
  returnUploadFileNameList,
} from '../utils/file.filter.util';
import { AnyFilesInterceptor } from '@nestjs/platform-express'; // Multer Module
import { diskStorage } from 'multer'; // Multer Module
import { ValidationPipe } from '@nestjs/common'; // Validation Pipe
import {
  ApiTags,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger'; // Swagger UI

/* http://"IP":3000/api/notice/... */
@ApiTags('api/notice')
@Controller('api/notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  /* api/notice/all?index=0 */
  @Get('all')
  @ApiNoContentResponse({
    description: 'Notice List does not exist',
    type: [NoticeDto],
  })
  @ApiOkResponse({ description: 'Notice List exists', type: [NoticeDto] })
  async getAllNotice(@Param('index') index: number, @Res() res) {
    const notices = await this.noticeService.findAll(index);
    if (notices.length == 0) {
      res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: 'Notice List does not exist', body: notices });
    } else {
      res
        .status(HttpStatus.OK)
        .json({ message: 'Notice List exists', body: notices });
    }
  }

  /* api/notice/action?index=0 */
  @Get('action')
  @ApiNoContentResponse({
    description: 'Action Notice List does not exist',
    type: [NoticeDto],
  })
  @ApiOkResponse({
    description: 'Action Notice List exists',
    type: [NoticeDto],
  })
  async getActionNotice(@Param('index') index: number, @Res() res) {
    const notices = await this.noticeService.findAction(index);
    if (notices.length == 0) {
      res.status(HttpStatus.NO_CONTENT).json({
        message: 'Action Notice List does not exist',
        body: notices,
      });
    } else {
      res
        .status(HttpStatus.OK)
        .json({ message: 'Action Notice List exists', body: notices });
    }
  }

  /* api/notice/"imgpath" */
  @Get(':imgpath')
  @ApiOkResponse({
    description: 'Send Image File',
  })
  seeUploadedFile(@Param('imgpath') image: string, @Res() res) {
    return res.status(HttpStatus.OK).sendFile(image, { root: './files' });
  }

  /* api/notice/upload */
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ description: 'Notice updated successfully' })
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  /* error handling with class-validation */
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
    @UploadedFiles() files: FilesDto,
    @Res() res,
  ) {
    noticeDto.uploadFileList = returnUploadFileNameList(files);
    await this.noticeService.create(noticeDto);
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'Notice updated successfully' });
  }
}
