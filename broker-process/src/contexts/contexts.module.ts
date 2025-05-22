import { Module } from "@nestjs/common";
import { HealthModule } from './health/health.module';
import { vehicleModule } from "./vehicle/vehicle.module";

@Module({
  imports: [
    vehicleModule,
    HealthModule,
  ],
})
export class ContextsModule {}
