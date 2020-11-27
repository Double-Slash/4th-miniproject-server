import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

/* User DB */
/*
 *  DB 구조
 *  아이디
 *  패스워드
 *  이름
 *  나이
 *  성별 (0-> 남자 1-> 여자)
 *  지원분야 (0-> 안드로이드 개발, 1-> 서버 개발, 2-> 웹 개발, 3-> 앱/웹 UI/UX 디자인, 4-> 앱/웹 서비스 기획)
 *  접근권한 (0-> 일반, 1-> 회원, 2-> 관리자)
 */
@Schema()
export class User {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  sex: number;

  @Prop({ required: true })
  fieldSupport: number;

  @Prop({ required: true })
  type: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
