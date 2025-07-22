import { Controller, Get, Headers, Req, Res } from '@nestjs/common';
import { GitAuthRequest, GitAuthResponse } from 'src/utils/types/reqres';
import { GitAuthUrl, GitOAuth } from './auth.services';

@Controller('auth')
export class GitAuthController {
  constructor(
    private readonly git: GitAuthUrl,
    private readonly gitcallback: GitOAuth,
  ) {}
  @Get('user')
  gitauth(@Res() res: GitAuthResponse) {
    res.redirect(this.git.getGitUrl());
  }

  @Get('gitoauth-callback')
  gitauthcall(@Req() req: GitAuthRequest, @Res() res: GitAuthResponse) {
    this.gitcallback.gitOAuthReq(req, res);
  }
}
