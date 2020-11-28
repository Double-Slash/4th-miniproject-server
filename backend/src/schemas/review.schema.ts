import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

/* Review DB */
@Schema()
export class Review {
  @Prop({ required: true })
  review: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nickname: string;

  @Prop()
  profileUrl: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
