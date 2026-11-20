import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

async function bootstrap() {
  // Connected to recipe-db, but no route yet: the gRPC server comes in part 2
  const app = await NestFactory.createApplicationContext(AppModule);
  app.enableShutdownHooks();
}
await bootstrap();
