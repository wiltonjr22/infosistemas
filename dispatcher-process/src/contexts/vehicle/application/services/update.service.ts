import { SQS_QUEUES } from '@/resources/aws/dtos/base-sqs-message.dto';
import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { VehicleService } from './vehicle.service';
import { UpdateVehicleDto } from '../../commom/dto/update.dto';

@Injectable()
export class UpdateVehicleService extends VehicleService {
  @SqsMessageHandler(SQS_QUEUES.UPDATE, false)
  async execute(message: any): Promise<void> {
    try {
      const data: UpdateVehicleDto = JSON.parse(message.Body);
      await this.update(data);
    } catch (error) {
      this.logger.error(
        `Failed to process Intelipost in-transit status: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
