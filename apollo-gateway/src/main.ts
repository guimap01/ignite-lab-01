import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let isServerRunning = false;
  do {
    await app.listen(3003, () => {
      console.log('App listening on port 3003!');
      isServerRunning = true;
    });
  } while (!isServerRunning);
}
bootstrap();
