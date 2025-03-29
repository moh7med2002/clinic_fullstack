/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const CookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
  });
  app.use(
    CookieSession({
      keys: ['asdf'], // Secret key for signing the cookie
      secure: false, // Set to true in production (HTTPS only)
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      sameSite: 'lax', // Allow cookies to be sent with same-site requests
    }),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(5000);
}
bootstrap();
