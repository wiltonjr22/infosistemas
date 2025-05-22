import { VehicleEntity } from "../../commom/entitites/vehicle.entity";
import { CreateInput } from "../../presentation/dtos/create.input";
import { UpdateInput } from "../../presentation/dtos/update.input";

export interface IVehicleService {
  create(
    data: CreateInput
  ): Promise<void>;
  findAll(
  ): Promise<VehicleEntity[]>;
  findOne(
    id: number
  ): Promise<VehicleEntity>;
  update(
    id: number,
    data: UpdateInput
  ): Promise<void>;
  remove(
    id: number
  ): Promise<void>;
}
