import { IsNotEmpty } from 'class-validator';

/* Recruit DTO */
/*
 *  DTO 구조
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
 */
export class RecruitDto {
  @IsNotEmpty()
  college: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  schoolYear: number;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  sex: number;

  @IsNotEmpty()
  phoneNumber: number;

  @IsNotEmpty()
  fieldSupport: number;

  @IsNotEmpty()
  reasonForRecruit: string;

  @IsNotEmpty()
  motivationForRecruit: string;

  @IsNotEmpty()
  detailActive: string;

  @IsNotEmpty()
  detectPath: string;

  @IsNotEmpty()
  project: string;

  @IsNotEmpty()
  friend: string;

  @IsNotEmpty()
  ambition: string;

  isAccept: number;
}
