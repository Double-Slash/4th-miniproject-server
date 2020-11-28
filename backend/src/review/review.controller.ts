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
  UploadedFile,
  Logger,
  Res,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from '../dto/review.dto';
import { FileDto } from '../dto/file.dto';
import { editFileName, imageFileFilter } from '../utils/file.filter.util';
import { FileInterceptor } from '@nestjs/platform-express'; // Multer Module
import { diskStorage } from 'multer'; // Multer Module
import { ValidationPipe } from '@nestjs/common'; // Validation Pipe
import {
  ApiTags,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger'; // Swagger UI

/* http://"IP":3000/api/review/... */
@ApiTags('api/review')
@Controller('api/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /* api/review/all */
  @Get('all')
  @ApiNoContentResponse({
    description: 'Review List does not exist',
    type: [ReviewDto],
  })
  @ApiOkResponse({ description: 'Review List exists', type: [ReviewDto] })
  async getAllProject(@Res() res) {
    const reviews = await this.reviewService.findAll();
    if (reviews.length == 0) {
      res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: 'Review List does not exist', body: reviews });
    } else {
      res
        .status(HttpStatus.OK)
        .json({ message: 'Review List exists', body: reviews });
    }
  }

  /* api/review/"imgpath" */
  @Get(':imgpath')
  @ApiOkResponse({
    description: 'Send Image File',
  })
  seeUploadedProfile(@Param('imgpath') image: string, @Res() res) {
    return res.status(HttpStatus.OK).sendFile(image, { root: './profile' });
  }

  /* api/review/upload */
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ description: 'Review updated successfully' })
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  /* error handling with class-validation */
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './profile',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadProject(
    @Body() reviewDto: ReviewDto,
    @UploadedFile() file,
    @Res() res,
  ) {
    reviewDto.profileUrl = file.filename;
    await this.reviewService.create(reviewDto);
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'Review updated successfully' });
  }
}
