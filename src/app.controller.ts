import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
@Controller()
export class AppController {
  @Get('/home')
  root(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'static', 'index.html'));
  }
}
