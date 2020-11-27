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

/* http://"IP":3000/api/notice/... */
@Controller('recruit')
export class RecruitController {
  constructor(private readonly recruitService: RecruitService) {}

  /* api/recruit/status?name=""&phone="" */
  @Get('/status')
  async getOneOfTheRecruit(
    @Param('name') name,
    @Param('phoneNumber') phoneNumber,
    @Res() res,
  ) {
    const recruiteStatus = await this.recruitService.findOne(name, phoneNumber);
    if (recruiteStatus == null) {
      res.status(HttpStatus.NO_CONTENT).json({
        message: 'Does not exist this Person',
        body: recruiteStatus.isAccept,
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
  async getAllRecruit(@Res() res) {
    const recruiteStatus = await this.recruitService.findAll();
    if (recruiteStatus == null) {
      res
        .status(HttpStatus.NO_CONTENT)
        .json({ message: 'Nobody recruit', body: recruiteStatus });
    } else {
      res
        .status(HttpStatus.OK)
        .json({ message: 'Recruit exist', body: recruiteStatus });
    }
  }

  /* api/recruit/upload */
  @Post('/upload')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async uploadRecruit(@Body() recruitDto: RecruitDto, @Res() res) {
    recruitDto.isAccept = 0; // Default Value
    await this.recruitService.create(recruitDto);
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'Recruit updated successfully' });
  }
}
