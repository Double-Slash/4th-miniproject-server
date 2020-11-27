import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Swagger UI
import { ValidationPipe } from '@nestjs/common';

// Nest.js Description
// NestFactory -> Nest Application instance 생성 코어 클래스
// bootstrap -> 예비 명령에 의해 프로그램을 로드하는 방법

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors(); // Cors Activated
  app.useGlobalPipes(new ValidationPipe()); // Validation Pipe
  app.use(cookieParser()); // Cookie Parser
  const options = new DocumentBuilder() // Swagger UI Options
    .setTitle('Double Slash API Examples')
    .setDescription('Double Slash API Description')
    .setVersion('1.0')
    .addTag('DS')
    .build();
  const document = SwaggerModule.createDocument(app, options); // Swagger UI Set
  SwaggerModule.setup('api/ds', app, document); // http://localhost:3000/api/ds

  await app.listen(3000); // Port Number 3000
}
bootstrap();
