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
import { ProjectService } from './project.service';
import { ProjectDto } from '../dto/project.dto';
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

/* http://"IP":3000/api/project/... */
@ApiTags('api/project')
@Controller('api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /* api/project/all */
  @Get('all')
  @ApiNoContentResponse({
    description: 'Proejct List does not exist',
    type: [ProjectDto],
  })
  @ApiOkResponse({ description: 'Proejct List exists', type: [ProjectDto] })
  async getAllProject(@Res() res) {
    const projects = await this.projectService.findAll();
    if (projects.length == 0) {
      res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: 'Proejct List does not exist', body: projects });
    } else {
      res
        .status(HttpStatus.OK)
        .json({ message: 'Proejct List exists', body: projects });
    }
  }

  /* api/project/target */
  @Get('target')
  @ApiNoContentResponse({
    description: 'Proejct does not exist',
    type: ProjectDto,
  })
  @ApiOkResponse({ description: 'Proejct exists', type: ProjectDto })
  async getTargetProject(@Param('title') title: string, @Res() res) {
    const project = await this.projectService.findOne(title);
    if (project == null) {
      res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: 'Proejct does not exist', body: project });
    } else {
      res
        .status(HttpStatus.OK)
        .json({ message: 'Proejct exists', body: project });
    }
  }

  /* api/project/icons */
  @Get('icons')
  @ApiNoContentResponse({
    description: 'Project icons does not exist',
    type: [ProjectDto],
  })
  @ApiOkResponse({ description: 'Proejct icons exist', type: [ProjectDto] })
  async getProjectUrls(@Res() res) {
    const projectUrls = await this.projectService.findUrls();
    if (projectUrls.length == 0) {
      res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: 'Project icons not exist', body: projectUrls });
    } else {
      res
        .status(HttpStatus.OK)
        .json({ message: 'Project icons exist', body: projectUrls });
    }
  }

  /* api/project/"imgpath" */
  @Get(':imgpath')
  @ApiOkResponse({
    description: 'Send Image File',
  })
  seeUploadedIcon(@Param('imgpath') image: string, @Res() res) {
    return res.status(HttpStatus.OK).sendFile(image, { root: './icon' });
  }

  /* api/project/upload */
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ description: 'Project updated successfully' })
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  /* error handling with class-validation */
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './icon',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadProject(
    @Body() projectDto: ProjectDto,
    @UploadedFile() file,
    @Res() res,
  ) {
    projectDto.iconUrl = file.filename;
    await this.projectService.create(projectDto);
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'Project updated successfully' });
  }
}
