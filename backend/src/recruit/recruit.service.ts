import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recruit, RecruitDocument } from '../schemas/recruit.schema';
import { RecruitDto } from '../dto/recruit.dto';

@Injectable()
export class RecruitService {
  constructor(
    @InjectModel(Recruit.name) private recruitModel: Model<RecruitDocument>,
  ) {}

  /* Update the Recruit */
  async create(recruitDto: RecruitDto): Promise<Recruit> {
    const createdRecruit = new this.recruitModel(recruitDto);
    return createdRecruit.save();
  }

  /* Find all of the Recruit  */
  /* MASTER MODE USED */
  async findAll(): Promise<Recruit[]> {
    return this.recruitModel.find().exec();
  }

  /* Only find the One of the Recruit Person */
  async findOne(name, phoneNumber): Promise<Recruit> {
    return this.recruitModel
      .findOne({ name: name, phoneNumber: phoneNumber })
      .exec();
  }
}
