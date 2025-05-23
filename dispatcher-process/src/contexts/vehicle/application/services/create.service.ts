import { SQS_QUEUES } from '@/resources/aws/dtos/base-sqs-message.dto';
import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from '../../commom/dto/create.dto';

@Injectable()
export class CreateVehicleService extends VehicleService {
  @SqsMessageHandler(SQS_QUEUES.CREATE, false)
  async execute(message: any): Promise<void> {
    try {
      const data: CreateVehicleDto = JSON.parse(message.Body);
      await this.create(data);
    } catch (error) {
      this.logger.error(
        `Failed to process Intelipost in-transit status: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
