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
  Logger,
  Res,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common'; // Validation Pipe
import { RecruitService } from './recruit.service';
import { RecruitDto } from '../dto/recruit.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger'; // Swagger UI

/* http://"IP":3000/api/notice/... */
@ApiTags('api/recruit')
@Controller('api/recruit')
export class RecruitController {
  constructor(private readonly recruitService: RecruitService) {}

  /* api/recruit/status?name=""&phone="" */
  @Get('/status')
  @ApiNoContentResponse({
    description: 'Does not exist this Person',
    type: Number,
  })
  @ApiOkResponse({ description: 'The person in recruit exists', type: Number })
  async getOneOfTheRecruit(
    @Param('name') name: string,
    @Param('phoneNumber') phoneNumber: number,
    @Res() res,
  ) {
    const recruiteStatus = await this.recruitService.findOne(name, phoneNumber);
    if (recruiteStatus == null) {
      res.status(HttpStatus.NO_CONTENT).json({
        message: 'Does not exist this Person',
        body: -1,
      });
    } else {
      res.status(HttpStatus.OK).json({
        message: 'The person in recruit exists',
        body: recruiteStatus.isAccept,
      });
    }
  }

  /* api/recruit/all */
  /* MASTER MODE USED*/
  @Get('/all')
  @ApiNoContentResponse({ description: 'Nobody recruit', type: [RecruitDto] })
  @ApiOkResponse({ description: 'Recruit exist', type: [RecruitDto] })
  async getAllRecruit(@Res() res) {
    const recruiteStatusList = await this.recruitService.findAll();
    if (recruiteStatusList.length == 0) {
      res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: 'Nobody recruit', body: recruiteStatusList });
    } else {
      res
        .status(HttpStatus.OK)
        .json({ message: 'Recruit exist', body: recruiteStatusList });
    }
  }

  /* api/recruit/upload */
  @Post('/upload')
  @ApiCreatedResponse({ description: 'Recruit updated successfully' })
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async uploadRecruit(@Body() recruitDto: RecruitDto, @Res() res) {
    recruitDto.isAccept = 0; // Default Value
    await this.recruitService.create(recruitDto);
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'Recruit updated successfully' });
  }
}
