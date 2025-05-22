import { ResourcesModule } from "@/resources/resources.module";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthMiddleware } from "./contexts/auth/auth.middleware";
import { ContextsModule } from "./contexts/contexts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    ContextsModule,
    ResourcesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: "health", method: RequestMethod.GET })
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
