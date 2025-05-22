import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Logger,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UpdateInput } from "../dtos/update.input";
import { CreateInput } from "../dtos/create.input";
import { VehicleService } from "../../application/services/vehicle.service";
import { VehicleEntity } from "../../commom/entitites/vehicle.entity";

@ApiTags("Vehicles")
@Controller("vehicles")
export class VehicleController {
  private readonly logger = new Logger(VehicleController.name);

  constructor(private readonly vehicleService: VehicleService) { }

  @Post()
  async create(@Body() data: CreateInput) {
    this.logger.log("Creating vehicle");
    return this.vehicleService.create(data);
  }

  @Get()
  async findAll(): Promise<VehicleEntity[]> {
    this.logger.log("Listing all vehicles");
    return this.vehicleService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<VehicleEntity> {
    this.logger.log(`Getting vehicle ${id}`);
    return this.vehicleService.findOne(id);
  }

  @Put(":id")
  async update(@Param("id") id: number, @Body() data: UpdateInput) {
    this.logger.log(`Updating vehicle ${id}`);
    return this.vehicleService.update(id, data);
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    this.logger.log(`Deleting vehicle ${id}`);
    return this.vehicleService.remove(id);
  }
}