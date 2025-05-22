import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";


export class VehicleFactoryEntity {
  @Expose({ name: "plate" })
  @IsString()
  plate: string;

  @Expose({ name: "chassis" })
  @IsString()
  chassis: string;

  @Expose({ name: "renavam" })
  @IsString()
  renavam: string;

  @Expose({ name: "model" })
  @IsString()
  model: string;

  @Expose({ name: "brand" })
  @IsString()
  brand: string;

  @Expose({ name: "year" })
  @IsNumber()
  year: number;
}

export class VehicleEntity extends VehicleFactoryEntity {
  @Expose({ name: "id" })
  @IsNumber()
  id: number;
}
