import { AwsModule } from '@/resources/aws/aws.module';
import { DatabasesModule } from '@/resources/databases/databases.module';
import { Module } from '@nestjs/common';
import { VehicleProviders } from './commom/custom-providers/vehicle-providers';

@Module({
  imports: [AwsModule, DatabasesModule],
  controllers: [],
  exports: [
    VehicleProviders.Vehicle_Create_SERVICE,
    VehicleProviders.Vehicle_Delete_SERVICE,
    VehicleProviders.Vehicle_Update_SERVICE,
  ],
  providers: [
    VehicleProviders.Vehicle_Create_SERVICE,
    VehicleProviders.Vehicle_Delete_SERVICE,
    VehicleProviders.Vehicle_Update_SERVICE,
  ],
})
export class VehicleModule { }
