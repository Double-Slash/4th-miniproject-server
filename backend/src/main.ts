import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Nest.js Description
// NestFactory -> Nest Application instance 생성 코어 클래스
// bootstrap -> 예비 명령에 의해 프로그램을 로드하는 방법

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
