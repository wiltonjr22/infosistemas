import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { IVehicleService } from "../interfaces/vehicle.service.interface";
import { CreateInput } from "../../presentation/dtos/create.input";
import { UpdateInput } from "../../presentation/dtos/update.input";
import { PrismaService } from "@/resources/databases/prisma/prisma.service";
import { AwsSqsService } from "@/resources/aws/aws-sqs.service";
import { VehicleCreateInput } from "../../commom/entities/vehicle-create.input.entity";
import { VehicleUpdateInput } from "../../commom/entities/vehicle-update.input.entity";
import { VehicleRemoveInput } from "../../commom/entities/vehicle-remove.input.entity";
import { VehicleEntity } from "../../commom/entities/vehicle.entity";

@Injectable()
export class VehicleService implements IVehicleService {
  private readonly logger = new Logger(VehicleService.name);

  constructor(private readonly prisma: PrismaService,
    private awsSqsService: AwsSqsService,
  ) { }

  private async testConnection() {
    try {
      const result: Array<{ test: number }> = await this.prisma
        .$queryRaw`SELECT 1 AS test;`;
      console.log("🚀 ~ testConnection ~ result:", result);
      if (!Array.isArray(result) || result.length === 0) {
        this.logger.error(
          "Unexpected result from connection test query:",
          JSON.stringify(result),
        );
        throw new Error(
          "Failed to establish database connection due to unexpected query result.",
        );
      }
      this.logger.log(
        "Database connection established successfully:",
        JSON.stringify(result),
      );
    } catch (err) {
      this.logger.error(
        "Failed to establish database connection:",
        err.message,
      );
      throw new Error(
        "Failed to establish database connection. " +
        (err.message || "Unknown error"),
      );
    }
  }


  async onModuleInit() {
    await this.testConnection();
  }

  async create(data: CreateInput): Promise<void> {
    try {
      const message = new VehicleCreateInput(data);
      await this.awsSqsService.sendMessage("CREATE", message);

      this.logger.log(
        `Successfully queued`
      );
    } catch (error) {
      this.logger.error(
        `Error queueing `,
        error.stack
      );
      throw error;
    }
  }

  async findAll(): Promise<VehicleEntity[]> {
    try {
      const vehicles = await this.prisma.vehicle.findMany({ where: { isActive: 1 } });
      return vehicles; 
    } catch (error) {
      this.logger.error("Error fetching vehicles", error);
      throw error;
    }
  }


  async findOne(id: number): Promise<VehicleEntity> {
    try {
      const vehicle = await this.prisma.vehicle.findUnique({ where: { id, isActive: 1 } });
      if (!vehicle) throw new NotFoundException("Vehicle not found");
      return vehicle;
    } catch (error) {
      this.logger.error(`Error fetching vehicle ${id}`, error);
      throw error; 
    }
  }

  async update(id: number, data: UpdateInput): Promise<void> {
    try {
      const message = new VehicleUpdateInput(id, data);
      await this.awsSqsService.sendMessage("UPDATE", message);

      this.logger.log(
        `Successfully queued`
      );
    } catch (error) {
      this.logger.error(
        `Error queueing `,
        error.stack
      );
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const message = new VehicleRemoveInput(id);
      await this.awsSqsService.sendMessage("REMOVE", message);

      this.logger.log(
        `Successfully queued`
      );
    } catch (error) {
      this.logger.error(
        `Error queueing `,
        error.stack
      );
      throw error;
    }
  }
}