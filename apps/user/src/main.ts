import { NestFactory } from '@nestjs/core';
import { grpcOptions } from '@recipes/contracts/grpc';

import { AppModule } from './app.module.js';
import { config } from './config.js';

// Connects to user-db and does nothing else yet: no gRPC server so far
async function bootstrap() {
  const app = await NestFactory.createMicroservice(
      AppModule,
      grpcOptions('user', config.grpcUrl),
    );
    app.enableShutdownHooks();
    await app.listen();
}
await bootstrap();
