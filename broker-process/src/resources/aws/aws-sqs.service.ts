import { BaseSqsMessageDto } from "@/resources/aws/dtos/base-sqs-message.dto";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SqsService } from "@ssut/nestjs-sqs";
import {
  SqsQueueName,
  SQS_QUEUES,
  SQS_QUEUE_ENV_NAMES,
} from "./dtos/sqs-queues";

@Injectable()
export class AwsSqsService {
  private readonly logger = new Logger(AwsSqsService.name);

  constructor(
    private readonly sqsService: SqsService,
    private readonly configService: ConfigService,
  ) {}

  async sendMessage(
    queueName: SqsQueueName,
    message: BaseSqsMessageDto,
  ): Promise<boolean> {
    const queueKey = SQS_QUEUES[queueName];
    const sqsMessage = message.toSqsMessage();

    const envQueueName = this.configService.get<string>(
      SQS_QUEUE_ENV_NAMES[queueName],
    );
    const isFifo = envQueueName.endsWith(".fifo");

    // If using a FIFO queue, ensure groupId is set
    if (isFifo && !sqsMessage.groupId) {
      sqsMessage.groupId = "default-group";
    }

    try {
      await this.sqsService.send(queueKey, sqsMessage);
      this.logger.log(`Message sent to ${queueName} queue`);
      return true;
    } catch (error) {
      this.logger.error(
        `Error sending message to ${queueName} queue: ${error.message}`,
      );
      throw error;
    }
  }
}
