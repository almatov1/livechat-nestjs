import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as fs from 'fs';

// async function bootstrap() {
//   const httpsOptions = {
//     key: fs.readFileSync('nest.key'),
//     cert: fs.readFileSync('nest.cert'),
//   };

//   const app = await NestFactory.create(AppModule, {
//     httpsOptions,
//   });

//   await app.listen(3002);
// }
// bootstrap();
