import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/resources/databases/prisma/prisma.service';
import { CreateVehicleDto } from '../../commom/dto/create.dto';
import { UpdateVehicleDto } from '../../commom/dto/update.dto';

@Injectable()
export abstract class VehicleService {
  protected readonly logger: Logger;

  constructor(protected readonly prisma: PrismaService) {
    this.logger = new Logger(this.constructor.name);
  }

  abstract execute(message: any): Promise<void>;

  private async testConnection() {
    try {
      const result: Array<{ test: number }> = await this.prisma
        .$queryRaw`SELECT 1 AS test;`;
      console.log('🚀 ~ testConnection ~ result:', result);
      if (!Array.isArray(result) || result.length === 0) {
        this.logger.error(
          'Unexpected result from connection test query:',
          JSON.stringify(result),
        );
        throw new Error(
          'Failed to establish database connection due to unexpected query result.',
        );
      }
      this.logger.log(
        'Database connection established successfully:',
        JSON.stringify(result),
      );
    } catch (err) {
      this.logger.error(
        'Failed to establish database connection:',
        err.message,
      );
      throw new Error(
        'Failed to establish database connection. ' +
          (err.message || 'Unknown error'),
      );
    }
  }

  protected async onModuleInit() {
    await this.testConnection();
  }

  protected async create(data: CreateVehicleDto): Promise<void> {
    try {
      await this.prisma.vehicle.create({
        data: {
          plate: data.plate,
          chassis: data.chassis,
          renavam: data.renavam,
          model: data.model,
          brand: data.brand,
          year: data.year,
        },
      });
    } catch (error) {
      this.logger.error('Error fetching vehicles', error);
      throw error;
    }
  }

  protected async update(data: UpdateVehicleDto): Promise<void> {
    try {
      await this.prisma.vehicle.update({
        where: { id: data.id },
        data,
      });
    } catch (error) {
      this.logger.error('Error fetching vehicles', error);
      throw error;
    }
  }

  protected async delete(id: number): Promise<void> {
    try {
      await this.prisma.vehicle.update({
        where: { id },
        data: { isActive: 0 },
      });
    } catch (error) {
      this.logger.error('Error fetching vehicles', error);
      throw error;
    }
  }
}
