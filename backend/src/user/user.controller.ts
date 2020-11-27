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

/* http://"IP":3000/api/user/... */
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* api/user/sign/in */
  @Post('sign/in')
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
  @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
  async signUp(@Body() userDto: UserDto, @Res() res) {
    await this.userService.create(userDto);
    res.status(HttpStatus.CREATED).json({ message: 'Sign Up successfully' });
  }
}
