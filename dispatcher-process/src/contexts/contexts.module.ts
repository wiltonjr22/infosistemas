import { VehicleModule } from '@/contexts/vehicle/vehicle.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [VehicleModule],
})
export class ContextsModule {}
