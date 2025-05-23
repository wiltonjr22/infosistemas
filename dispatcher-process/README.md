# Dispatcher Infosistemas

This project is a **Transactional Backend API** responsible for managing business and technical rules for transactional operations. Built with [NestJS](https://nestjs.com/), it ensures scalability, maintainability, and testability for server-side applications.

## Features 🌟

- **SOLID Principles**: The codebase follows SOLID principles for maintainable and extensible software.
- **Object-Oriented Programming**: Uses OOP concepts for modular and reusable code.
- **Swagger Integration**: API documentation is available via Swagger (`/swagger` endpoint).
- **Hexagonal Architecture**: Separates core business logic from external concerns (database, AWS, etc.).
- **AWS SQS Integration**: Handles asynchronous messaging using AWS SQS.
- **Prisma ORM**: Database access and migrations are managed with Prisma.
- **Environment Configuration**: Uses environment variables for configuration and secrets.
- **API Key Authentication**: Secured endpoints using API key middleware.

## Project Structure

- `src/contexts/vehicle/`: Vehicle domain logic, including services and DTOs.
- `src/resources/aws/`: AWS SQS integration modules and DTOs.
- `src/resources/databases/`: Prisma database integration.
- `src/contexts/auth/`: API key authentication middleware.
- `src/contexts/health/`: Health check endpoint.

## Design Patterns & Principles

- **Dependency Injection**: Provided by NestJS for controllers, services, and middleware.
- **Factory Pattern**: Used for creating message DTOs for SQS.
- **Middleware Pattern**: Used for authentication (`AuthMiddleware`).
- **Interface Segregation**: Service interfaces define contracts for business logic.
- **Open/Closed Principle**: Services and controllers are open for extension, closed for modification.
- **Hexagonal Architecture (Ports & Adapters)**: Core logic is decoupled from infrastructure.

## Installation 🛠️

Install dependencies using your preferred package manager:

```bash
pnpm install
# or
npm install
# or
yarn install
```
