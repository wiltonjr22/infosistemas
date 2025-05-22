import { BaseSqsMessageDto } from "@/resources/aws/dtos/base-sqs-message.dto";
import { UpdateInput } from "../../presentation/dtos/update.input";

export class VehicleUpdateInput extends BaseSqsMessageDto {
  private updateInput: UpdateInput;

  constructor(id: number, data: UpdateInput) {
    super();
    this.updateInput = this.convertToPaymentDto(id, data);
  }

  private convertToPaymentDto(id: number, data: UpdateInput): UpdateInput {
    return {
      id: id,
      plate: data.plate,
      chassis: data.chassis,
      renavam: data.renavam,
      model: data.model,
      brand: data.brand,
      year: data.year,
    }
  }

  toSqsMessage(): any {
    return {
      id: this.updateInput.id,
      body: JSON.stringify(this.updateInput),
      messageAttributes: {
        messageType: {
          DataType: "String",
          StringValue: "Update",
        },
      },
      groupId: this.updateInput.id,
      deduplicationId: this.updateInput.id,
    };
  }
}