import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notice, NoticeDocument } from '../schemas/notice.schema';
import { NoticeDto } from '../dto/notice.dto';

/* Notice DB Service */
@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
  ) {}

  /* Update the Notice */
  async create(noticeDto: NoticeDto): Promise<Notice> {
    const createdNotice = new this.noticeModel(noticeDto);
    return createdNotice.save();
  }

  /* Find all of the Notice */
  async findAll(index: number): Promise<Notice[]> {
    return this.noticeModel
      .find()
      .skip((index - 1) * 8)
      .limit(8)
      .exec();
  }

  /* Only find the Notice with type is Action(2) */
  async findAction(index: number): Promise<Notice[]> {
    return this.noticeModel
      .find({ type: 2 })
      .skip((index - 1) * 8)
      .limit(8)
      .exec();
  }
}
