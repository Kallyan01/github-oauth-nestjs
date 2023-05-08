import { Controller, Get, Req, Res } from '@nestjs/common';
import { GitAuthUrl, GitOAuth } from './auth.services';
import { Response, Request } from 'express';
import axios from 'axios';

@Controller('auth')
export class GitAuth {
  constructor(private readonly git: GitAuthUrl) {}
  @Get('user')
  gitauth(@Res() res: Response) {
    res.redirect(this.git.getGitUrl());
  }
}
@Controller('auth')
export class GitAuthCallBack {
  constructor(private readonly gitcallback: GitOAuth) {}
  @Get('gitoauth-callback')
  gitauthcall(@Req() req: Request, @Res() res: Response) {
    this.gitcallback.gitOAuthReq(req, res);
  }
}
