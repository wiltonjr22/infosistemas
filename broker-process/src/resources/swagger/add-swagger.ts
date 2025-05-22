import { ContextsModule } from "@/contexts/contexts.module";
import { HealthModule } from "@/contexts/health/health.module";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

export default function AddSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("[BROKER] Transacionais")
    .setDescription("API for the message broker microservice in the client communication structure")
    .setVersion("1.0")
    .addApiKey(
      {
        type: "apiKey",
        name: "x-api-key",
        in: "header",
      },
      "x-api-key"
    );

  if (process.env.NODE_ENV !== "production") {
    config.addTag("Development Environment");
  }

  const options: SwaggerDocumentOptions = {
    include: [
      ContextsModule,
    ],
  };

  const document = SwaggerModule.createDocument(app, config.build(), options);

  // 👇 Adiciona o esquema de segurança globalmente no document final
  document.security = [{ "x-api-key": [] }];

  SwaggerModule.setup("swagger", app, document);
}
