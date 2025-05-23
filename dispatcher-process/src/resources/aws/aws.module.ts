import { SQSClient } from '@aws-sdk/client-sqs';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SQS_QUEUES, SQS_QUEUE_ENV_NAMES } from './dtos/base-sqs-message.dto';

@Module({
  imports: [
    ConfigModule,
    SqsModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('AwsModule');
        const region = configService.get<string>('AWS_REGION');

        if (!region) {
          throw new Error(
            'AWS_REGION is not defined in the environment variables',
          );
        }

        const sqsClient = new SQSClient({
          region,
          credentials: fromNodeProviderChain({
            profile: configService.get<string>('AWS_PROFILE'),
          }),
        });

        const consumers = Object.entries(SQS_QUEUES).map(([key, value]) => {
          const queueUrlEnvName =
            SQS_QUEUE_ENV_NAMES[key as keyof typeof SQS_QUEUES];
          const queueUrl = configService.get<string>(queueUrlEnvName);

          if (!queueUrl) {
            logger.error(
              `Queue URL not found for ${key}. Env variable ${queueUrlEnvName} is not set.`,
            );
            throw new Error(`Queue URL not found for ${key}`);
          }

          logger.log(
            `Configuring consumer for queue: ${key} with URL: ${queueUrl}`,
          );

          return {
            name: value,
            queueUrl: queueUrl,
            region,
            sqs: sqsClient,
          };
        });

        return { consumers };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [SqsModule],
})
export class AwsModule {}
