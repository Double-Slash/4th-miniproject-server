import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';

/* User DB Service */
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /* Update the User */
  async create(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  /* Find one of User */
  async findUser(loginDto: LoginDto): Promise<User> {
    return this.userModel
      .findOne({ id: loginDto.id, password: loginDto.password })
      .exec();
  }
}
