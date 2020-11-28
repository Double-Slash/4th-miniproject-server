import { ApiProperty } from '@nestjs/swagger'; // Swagger UI

export class FileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
