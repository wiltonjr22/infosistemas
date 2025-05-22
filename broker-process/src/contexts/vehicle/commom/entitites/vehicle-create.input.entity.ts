import { BaseSqsMessageDto } from "@/resources/aws/dtos/base-sqs-message.dto";
import { CreateInput } from "../../presentation/dtos/create.input";

export class VehicleCreateInput extends BaseSqsMessageDto {
  private createInput: CreateInput;

  constructor(input: CreateInput) {
    super();
    this.createInput = this.convertToPaymentDto(input);
  }

  private convertToPaymentDto(input: CreateInput): CreateInput {
    return input;
  }

  toSqsMessage(): any {
    return {
      id: Math.random().toString(36).substring(2, 15),
      body: JSON.stringify(this.createInput),
      messageAttributes: {
        messageType: {
          DataType: "String",
          StringValue: "Create",
        },
      },
      groupId: Math.random().toString(36).substring(2, 15),
      deduplicationId: Math.random().toString(36).substring(2, 15),
    };
  }
}