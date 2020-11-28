import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Swagger UI
import { MemberDto } from '../dto/member.dto';

/* Project DTO */
export class ProjectDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: [MemberDto] })
  @IsNotEmpty()
  members: MemberDto[];

  @ApiProperty({ type: String })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  service: string[];

  @ApiProperty({ type: String })
  iconUrl: string;

  @ApiProperty({ type: String })
  projectDataUrl: string;
}
