import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return { ok: true };
  }

  @Post('auth/sign-up')
  signUp(@Body() body: Record<string, unknown>) {
    return { token: 'dev-jwt-token', user: { email: body.email } };
  }

  @Post('auth/sign-in')
  signIn(@Body() body: Record<string, unknown>) {
    return { token: 'dev-jwt-token', user: { email: body.email } };
  }

  @Get('dashboard/demo')
  dashboard() {
    return { day: 14, hydrationMl: 1800, steps: 7400 };
  }
}
