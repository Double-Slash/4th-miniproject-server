import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoticeDocument = Notice & Document;

/* Notice DB */
@Schema()
export class Notice {
  @Prop()
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  timestamp: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: number;

  @Prop()
  uploadFileList: string[];
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
