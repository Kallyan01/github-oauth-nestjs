import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { GitAuthController } from './auth/auth.controller';
import { GitAuthUrl, GitOAuth } from './auth/auth.services';
import { CreateRepoController } from './auth/user.controller';
import { GitCreateRepo } from './auth/user.services';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, GitAuthController, CreateRepoController],
  providers: [GitAuthUrl, GitOAuth, GitCreateRepo],
})
export class AppModule {}
