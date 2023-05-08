import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GitAuthUrl, GitOAuth } from './auth/auth.services';
import { ConfigModule } from '@nestjs/config';
import { GitAuth, GitAuthCallBack } from './auth/auth.controller';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, GitAuth, GitAuthCallBack],
  providers: [GitAuthUrl, GitOAuth],
})
export class AppModule {}
