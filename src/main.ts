import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log('Run at port 5176');
  await app.listen(process.env.PORT ?? 5176);
}
bootstrap();
