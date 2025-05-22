import { BaseSqsMessageDto } from "@/resources/aws/dtos/base-sqs-message.dto";

export class VehicleRemoveInput extends BaseSqsMessageDto {
  private id: number;

  constructor(id: number) {
    super();
    this.id = this.convertToPaymentDto(id);
  }

  private convertToPaymentDto(id: number): number {
    return id
  }

  toSqsMessage(): any {
    return {
      id: this.id,
      body: JSON.stringify(this.id),
      messageAttributes: {
        messageType: {
          DataType: "String",
          StringValue: "Remove",
        },
      },
      groupId: this.id,
      deduplicationId: this.id,
    };
  }
}