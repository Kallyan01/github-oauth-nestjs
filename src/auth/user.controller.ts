import { Controller, Get, Headers, Post, Req, Res } from '@nestjs/common';
import { GitCreateRepo } from './user.services';
import { CreateRepoRequest, CreateRepoResponse } from 'src/utils/types/reqres';

@Controller('user')
export class CreateRepoController {
  constructor(private readonly git: GitCreateRepo) {}
  @Post('create_repo')
  gitauth(
    @Headers('authorization') authHeader: string,
    @Req() req: CreateRepoRequest,
    @Res() res: CreateRepoResponse,
  ) {
    const body = req.body;
    this.git.createRepo(res, { body, authHeader });
  }
}
