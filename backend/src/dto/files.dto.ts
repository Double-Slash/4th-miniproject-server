import { ApiProperty } from '@nestjs/swagger'; // Swagger UI

export class FilesDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
