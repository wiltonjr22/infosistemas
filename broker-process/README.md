# Broker Infosistemas

This project is a **Broker** service for Infosistemas, built with [NestJS](https://nestjs.com/). It acts as an intermediary for vehicle operations, featuring API Key authentication, AWS SQS integration, and data persistence with Prisma.

## Getting Started

- Node.js: 22.16.0

```bash
npm install
npm run dev
```

## Build and Test

```bash
npm run build
npm run test
```

## Project Structure

- `src/contexts/vehicle/presentation/controllers/vehicle.controller.ts`: Main controller for vehicle CRUD operations.
- `src/contexts/vehicle/application/services/vehicle.service.ts`: Business logic and integration with AWS SQS and Prisma.
- `src/contexts/auth/auth.middleware.ts`: API Key authentication middleware.
- `src/contexts/vehicle/commom/entitites/`: Domain entities and DTOs.

## Authentication

Authentication is handled via the `x-api-key` header. Set the API key in the `API_KEY` environment variable.

## Design Patterns and Principles

This project applies several software engineering best practices and design patterns:

- **SOLID Principles**:  
  - **Single Responsibility Principle**: Each class (controller, service, middleware) has a single responsibility.
  - **Open/Closed Principle**: Services and controllers are open for extension but closed for modification.
  - **Liskov Substitution Principle**: Interfaces (like `IVehicleService`) allow for substitutable implementations.
  - **Interface Segregation Principle**: Interfaces are used to define contracts for services.
  - **Dependency Inversion Principle**: Dependencies (like `PrismaService`, `AwsSqsService`) are injected, not instantiated directly.

- **Factory Pattern**:  
  - Entities such as `VehicleCreateInput`, `VehicleUpdateInput`, and `VehicleRemoveInput` act as factories for creating message objects to be sent to AWS SQS.

- **Dependency Injection**:  
  - Core to NestJS, used throughout the project for controllers, services, and middleware.

- **Middleware Pattern**:  
  - Used for authentication (`AuthMiddleware`), separating cross-cutting concerns from business logic.

## Notes

- Make sure to configure environment variables for database and AWS SQS connections.
- The project follows NestJS best practices for dependency injection and modularization.

---

**Infosistemas © 2024**