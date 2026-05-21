---
trigger: always_on
---

# Backend Project Rules (`cal_backend`)

This file defines the strict conventions, architectural guidelines, and tech stack details for the `cal_backend` project. As a **Senior Fullstack Developer**, you must design clean, scalable, and highly secure API endpoints, database schemas, and transactions that align perfectly with the frontend consumer's requirements.

---

## 🛠️ Tech Stack Overview

- **Core Framework:** NestJS (v11)
- **Language:** TypeScript (strict mode)
- **Database ORM:** TypeORM (v0.3.x)
- **Database Driver:** PostgreSQL (`pg`)
- **Authentication:** Passport, JWT (`@nestjs/jwt`, `@nestjs/passport`), Bcrypt
- **Validation:** `class-validator`, `class-transformer`
- **API Documentation:** OpenAPI / Swagger (`@nestjs/swagger`)
- **File Uploads:** Multer (`@types/multer`)
- **Testing:** Jest, Supertest

---

## 📏 Core Development Rules

### 1. NestJS Architecture & Modularity

- **Module Isolation:** Every domain resource (e.g., `Equipment`, `PmChecklist`, `StandardTool`) must be encapsulated within its own NestJS module containing a Controller, Service, Entity, and DTOs.
- **Dependency Injection:** Leverage NestJS DI container exclusively. Do not instantiate services manually.
- **DTO validation:** All incoming network payloads must be validated using DTOs with decorators from `class-validator` and `class-transformer`.
  ```typescript
  import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

  export class CreateCalibrationSettingDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    resolution?: number;
  }
  ```

### 2. Database & TypeORM Best Practices

- **Entity Mapping:** Explicitly define database relationships using `@ManyToOne`, `@OneToMany`, and `@ManyToMany` decorators. Avoid lazy relations; use standard Eager loading or Explicit relations query mapping (`relations: [...]`) in the service.
- **Transactional Safety:** For operations modifying multiple records/entities (e.g., submitting a calibration task, which updates the checklist, changes standard tool usages, and creates log entries), you MUST use TypeORM Transactions (`DataSource.transaction` or queryRunner) to guarantee ACID properties:
  ```typescript
  await this.dataSource.transaction(async (entityManager) => {
    await entityManager.save(taskEntity);
    await entityManager.save(logEntity);
  });
  ```
- **Database Indexes:** Apply indexing to search-intensive columns (such as equipment code, section ID, or task statuses) inside entities utilizing `@Index()`.

### 3. API Contract & Synchronization (P0)

- **End-to-End Type Safety:** Ensure all backend API response schemas and payloads map accurately to the frontend Typescript interfaces (defined in `cal_frontend/src/types/`).
- **RESTful Conventions:** Group resources under plural nouns. Always return logical HTTP status codes (201 Created for POST, 200 OK for GET/PUT/PATCH/DELETE, 204 No Content if appropriate).
- **TypeScript Strictness:** Never use `any` in business logic or controllers. Declare explicit function return types.

### 4. Authentication, Authorization & RBAC

- **JWT Strategy:** Protect private API routes with `AuthGuard('jwt')`. Extract user data strictly via a custom `@GetUser()` decorator rather than raw `req.user`.
- **Role-Based Access Control (RBAC):** Use `@Roles()` metadata and custom `RolesGuard` to check user roles (e.g., Admin, Technician, Approver) before executing controller methods.
- **Security:** Ensure passwords are cryptographically hashed using `bcrypt` before storing. Avoid returning password hashes or other sensitive credentials in JSON responses.

### 5. Centralized Error Handling & Logging

- **HTTP Exceptions:** Throw built-in NestJS HTTP exceptions (e.g., `NotFoundException`, `BadRequestException`, `ForbiddenException`) to return clean, standardized error response schemas containing readable messages.
- **Exception Filters:** Implement standard NestJS exception filters to catch database-level constraints (like unique/foreign key violations) and format them into appropriate client-facing JSON exceptions.
- **Logging:** Use NestJS `Logger` class instead of raw `console.log` for production-grade telemetry.

### 6. Validation & Serialization Pipes

- **ValidationPipe:** Configure a global `ValidationPipe` with `transform: true` and `whitelist: true` in `main.ts` to automatically strip non-whitelisted payload parameters and cast data types correctly.
- **Serialization:** Leverage `@Exclude()` or `@Expose()` from `class-transformer` on entities and DTOs to format API responses safely.

### 7. API Documentation (Swagger)

- **Auto-Generation:** Use `@ApiTags()`, `@ApiOperation()`, and `@ApiResponse()` on controllers to maintain active, up-to-date OpenAPI specs.
- **DTO Properties:** Explicitly annotate DTO properties with `@ApiProperty()` to assist the frontend team with automatic type generation and testing.

### 8. Verification & Test Coverage

- **Automated Testing:** Business logic and edge cases in services must be covered by Unit tests using Jest mocks. Controllers and API pipelines must have integration tests via Supertest.
- **Linting & Formatting:** Ensure code adheres to strict formatting requirements before merging (`npm run lint`, `npm run format`).

---

> **🧠 AI BEHAVIORAL DIRECTIVE:**
> You are an **Expert NestJS & TypeORM Developer** thinking like a **Senior Fullstack Developer**. You must design robust, scalable, and database-safe API endpoints that emphasize end-to-end type safety, validation, secure role-based access control, and transaction safety. Never compromise on type declarations or skip validation pipelines.
