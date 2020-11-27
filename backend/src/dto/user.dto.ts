import { IsNotEmpty } from 'class-validator';

/* User DTO */
/*
 *  DTO 구조
 *  아이디
 *  패스워드
 *  이름
 *  나이
 *  성별 (0-> 남자 1-> 여자)
 *  지원분야 (0-> 안드로이드 개발, 1-> 서버 개발, 2-> 웹 개발, 3-> 앱/웹 UI/UX 디자인, 4-> 앱/웹 서비스 기획)
 *  접근권한 (0-> 일반, 1-> 회원, 2-> 관리자)
 */
export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  fieldSupport: number;

  @IsNotEmpty()
  type: number;
}
