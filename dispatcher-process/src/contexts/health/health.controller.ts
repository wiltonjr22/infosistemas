import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth() {
    return { status: 'ok' };
  }
}
