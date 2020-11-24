import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoticeDocument = Notice & Document;

@Schema()
export class Notice {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  timestamp: string;

  @Prop()
  desc: string;

  @Prop()
  type: number;

  @Prop()
  uploadFileList: string[];
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
