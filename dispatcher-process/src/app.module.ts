import { ContextsModule } from '@/contexts/contexts.module';
import { ResourcesModule } from '@/resources/resources.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ResourcesModule,
    ContextsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
