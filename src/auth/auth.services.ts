import { Injectable, Req, Res } from '@nestjs/common';
import axios from 'axios';
import { Response, Request } from 'express';
import { GitAuthResponse } from 'src/utils/types/reqres';

@Injectable()
export class GitAuthUrl {
  getGitUrl(): string {
    return `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo%20user%20admin:repo_hook`;
  }
}

@Injectable()
export class GitOAuth {
  gitOAuthReq(@Req() { query: { code } }: Request, @Res() res: Response) {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code,
    };
    const opts = {
      headers: { accept: 'application/json' },
    };
    axios
      .post('https://github.com/login/oauth/access_token', body, opts)
      .then((_res) => _res.data.access_token)
      .then((token) => {
        // eslint-disable-next-line no-console
        console.log('My token:', token);

        res.redirect(`/?token=${token}`);
      })
      .catch((err) => res.status(500).json({ err: err.message }));
  }
}
