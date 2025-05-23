import { Module } from "@nestjs/common";
import { VehicleController } from "./presentation/controllers/vehicle.controller";
import { AwsModule } from "@/resources/aws/aws.module";
import { ConfigModule } from "@nestjs/config";
import { VehicleProviders } from "./commom/custom-providers/vehicle-providers";
import { DatabasesModule } from "@/resources/databases/databases.module";

@Module({
  imports: [AwsModule, ConfigModule, DatabasesModule],
  controllers: [VehicleController],
  exports: [VehicleProviders.Vehicle_SERVICE],
  providers: [VehicleProviders.Vehicle_SERVICE],
})
export class vehicleModule { }
