import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GitAuthUrl, GitOAuth } from './auth/auth.services';
import { ConfigModule } from '@nestjs/config';
import {
  GitAuthController,
  GitAuthCallBackController,
} from './auth/auth.controller';
import { CreateRepoController } from './auth/user.controller';
import { GitCreateRepo } from './auth/user.services';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [
    AppController,
    GitAuthController,
    GitAuthCallBackController,
    CreateRepoController,
  ],
  providers: [GitAuthUrl, GitOAuth, GitCreateRepo],
})
export class AppModule {}
