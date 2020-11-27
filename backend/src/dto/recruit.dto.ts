import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Swagger UI

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
  @ApiProperty({ type: String })
  @IsNotEmpty()
  college: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  department: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  schoolYear: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  age: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  sex: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  phoneNumber: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  fieldSupport: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  reasonForRecruit: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  motivationForRecruit: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  detailActive: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  detectPath: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  project: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  friend: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  ambition: string;

  @ApiProperty({ type: Number })
  isAccept: number;
}
