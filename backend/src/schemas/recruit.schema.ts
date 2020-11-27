import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecruitDocument = Recruit & Document;

/* Recruit DB */
/*
 *  DB 구조
 *  이름
 *  학과
 *  학년
 *  나이
 *  성별 (0-> 남자 1-> 여자)
 *  전화번호
 *  지원분야 (0-> 안드로이드 개발, 1-> 서버 개발, 2-> 웹 개발, 3-> 앱/웹 UI/UX 디자인, 4-> 앱/웹 서비스 기획)
 *  지원사유
 *  지원동기
 *  구체적으로 활동하고 싶은 것
 *  알게된 경로
 *  프로젝트 경험
 *  같이 지원한 친구
 *  한마디
 *  합격여부 (0 -> 심사중, 1-> 합격 ,2-> 불합격)
 */
@Schema()
export class Recruit {
  @Prop({ required: true })
  college: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  schoolYear: number;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  sex: number;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ required: true })
  fieldSupport: number;

  @Prop({ required: true })
  reasonForRecruit: string;

  @Prop({ required: true })
  motivationForRecruit: string;

  @Prop({ required: true })
  detailActive: string;

  @Prop({ required: true })
  detectPath: string;

  @Prop({ required: true })
  project: string;

  @Prop({ required: true })
  friend: string;

  @Prop({ required: true })
  ambition: string;

  @Prop({ required: true })
  isAccept: number;
}

export const RecruitSchema = SchemaFactory.createForClass(Recruit);
