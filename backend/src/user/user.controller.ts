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
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';
import { ValidationPipe } from '@nestjs/common'; // Validation Pipe
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'; // Swagger UI

/* http://"IP":3000/api/user/... */
@ApiTags('api/user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* api/user/sign/in */
  @Post('sign/in')
  @ApiUnauthorizedResponse({ description: 'Login Failed' })
  @ApiOkResponse({ description: 'Login Successful' })
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async signIn(@Body() loginDto: LoginDto, @Res() res) {
    const user = await this.userService.findUser(loginDto);
    if (user == null) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Login Failed' });
    } else {
      res.status(HttpStatus.OK).json({ message: 'Login Successful' });
    }
  }

  /* api/user/sign/up */
  @Post('sign/up')
  @ApiCreatedResponse({ description: 'Sign Up successfully' })
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async signUp(@Body() userDto: UserDto, @Res() res) {
    await this.userService.create(userDto);
    res.status(HttpStatus.CREATED).json({ message: 'Sign Up successfully' });
  }
}
