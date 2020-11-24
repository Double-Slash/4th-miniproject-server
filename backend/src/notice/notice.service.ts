import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notice, NoticeDocument } from '../schemas/notice.schema';
import { NoticeDto } from '../dto/notice.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
  ) {}

  async create(noticeDto: NoticeDto): Promise<Notice> {
    const createdNotice = new this.noticeModel(noticeDto);
    return createdNotice.save();
  }

  async findAll(): Promise<Notice[]> {
    return this.noticeModel.find().exec();
  }
}
