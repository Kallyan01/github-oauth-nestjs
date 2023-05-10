import { Controller, Get, Headers, Req, Res } from '@nestjs/common';
import { GitAuthUrl, GitOAuth } from './auth.services';
import { GitAuthRequest, GitAuthResponse } from 'src/utils/types/reqres';

@Controller('auth')
export class GitAuthController {
  constructor(private readonly git: GitAuthUrl) {}
  @Get('user')
  gitauth(@Res() res: GitAuthResponse) {
    res.redirect(this.git.getGitUrl());
  }
}
@Controller('auth')
export class GitAuthCallBackController {
  constructor(private readonly gitcallback: GitOAuth) {}
  @Get('gitoauth-callback')
  gitauthcall(@Req() req: GitAuthRequest, @Res() res: GitAuthResponse) {
    this.gitcallback.gitOAuthReq(req, res);
  }
}
