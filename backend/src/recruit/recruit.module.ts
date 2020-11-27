import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruitController } from './recruit.controller';
import { RecruitService } from './recruit.service';
import { Recruit, RecruitSchema } from '../schemas/recruit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recruit.name, schema: RecruitSchema }]),
  ],
  controllers: [RecruitController],
  providers: [RecruitService],
})
export class RecruitModule {}
