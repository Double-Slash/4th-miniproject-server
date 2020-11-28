import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Swagger UI

/* Member DTO */
/*
 *  DTO 구조
 *  이름
 * 지원분야
 * (0-> 안드로이드 개발, 1-> 서버 개발, 2-> 웹 개발, (0 - 2 개발)
 * 3-> 앱/웹 UI/UX 디자인, (3 -> 디자인)
 * 4-> 앱/웹 서비스 기획, (4 -> 기획)
 * 5-> 멘토)
 */
export class MemberDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  fieldSupport: number;
}
