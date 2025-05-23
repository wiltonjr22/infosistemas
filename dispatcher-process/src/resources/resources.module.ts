import { AwsModule } from '@/resources/aws/aws.module';
import { Module } from '@nestjs/common';
import { DatabasesModule } from './databases/databases.module';

@Module({
  imports: [AwsModule, DatabasesModule],
  exports: [AwsModule, DatabasesModule],
})
export class ResourcesModule { }
