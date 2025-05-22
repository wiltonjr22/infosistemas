import { DatabasesModule } from "@/resources/databases/databases.module";
import { Module } from "@nestjs/common";
import { AwsModule } from "./aws/aws.module";

@Module({
  imports: [DatabasesModule, AwsModule],
  exports: [DatabasesModule, AwsModule],
})
export class ResourcesModule {}
