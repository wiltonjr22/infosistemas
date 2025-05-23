import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";
import { VehicleFactoryEntity } from "../../commom/entities/vehicle.entity";

export class UpdateInput extends VehicleFactoryEntity {
  @Expose({ name: "id" })
  @IsNumber()
  id: number;

}
