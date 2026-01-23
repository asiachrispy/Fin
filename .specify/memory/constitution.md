<!--
Sync Impact Report:
Version change: N/A → 1.0.0 (initial constitution)
Modified principles: N/A (new constitution)
Added sections: Core Principles, Security Requirements, Development Workflow, Governance
Removed sections: N/A
Templates requiring updates:
  ✅ .specify/templates/plan-template.md (Constitution Check section aligns with principles)
  ✅ .specify/templates/spec-template.md (scope/requirements alignment maintained)
  ✅ .specify/templates/tasks-template.md (task categorization reflects principles)
Follow-up TODOs: None
-->

# Livo-backend Constitution

## Core Principles

### I. RESTful API Design
All API endpoints MUST follow RESTful conventions: resource-based URLs, standard HTTP methods (GET, POST, PUT, DELETE), appropriate status codes, and consistent response formats. API contracts are immutable once published; breaking changes require versioning. All APIs MUST be documented via Swagger/OpenAPI.

### II. Security-First (NON-NEGOTIABLE)
Authentication and authorization MUST be enforced at the API layer using Spring Security and JWT. All endpoints except explicitly whitelisted paths MUST require valid authentication. Sensitive operations MUST include authorization checks. Security configurations MUST be centralized and reviewed for all new features.

### III. Layered Architecture
Code MUST follow the standard Spring Boot layered architecture: Controller (API layer) → Service (business logic) → Mapper (data access). Each layer MUST have clear responsibilities with no cross-layer dependencies. Business logic MUST reside in Service layer, never in Controllers or Mappers.

### IV. Test-First Development
All business logic MUST have corresponding unit tests. Integration tests are REQUIRED for: new API endpoints, authentication/authorization flows, data access layer changes, and inter-service communication. Tests MUST be written before or alongside implementation, not after.

### V. Observability & Logging
Structured logging MUST be used throughout the application. All API requests MUST be logged with request IDs for traceability. Errors MUST include sufficient context for debugging. Performance-critical operations MUST include timing metrics. Logging levels MUST be appropriate (DEBUG for development, INFO/WARN for production).

### VI. Versioning & Breaking Changes
API versioning MUST follow semantic versioning (MAJOR.MINOR.PATCH). Breaking changes require MAJOR version increment and migration documentation. Database schema changes MUST include migration scripts. Configuration changes MUST be backward compatible or clearly documented.

### VII. Simplicity & Maintainability
Code MUST prioritize clarity over cleverness. YAGNI (You Aren't Gonna Need It) principles apply: avoid premature abstraction and over-engineering. Complex solutions MUST be justified with documented rationale. Code reviews MUST verify simplicity and maintainability.

## Security Requirements

All features MUST comply with the following security standards:

- **Authentication**: JWT-based authentication via Spring Security
- **Authorization**: Role-based access control for sensitive operations
- **Data Validation**: Input validation at Controller layer using Bean Validation
- **SQL Injection Prevention**: Use MyBatis parameterized queries exclusively
- **Sensitive Data**: Never log passwords, tokens, or sensitive user information
- **File Upload Security**: Validate file types, sizes, and scan for malicious content
- **API Rate Limiting**: Implement rate limiting for public endpoints
- **HTTPS**: All production APIs MUST use HTTPS

## Development Workflow

### Code Review Requirements
All code changes MUST be reviewed before merge. Reviewers MUST verify:
- Compliance with constitution principles
- Security requirements are met
- Tests are included and passing
- API documentation is updated
- No breaking changes without versioning

### Quality Gates
Before deployment, the following MUST pass:
- All unit tests
- All integration tests
- Code linting/formatting checks
- Security scan (if applicable)
- API documentation generation

### Deployment Process
1. Build JAR package using `mvn clean install`
2. Upload to server directory `/data/java/java-package/livo-agent/`
3. Execute deployment script: `sudo sh livo-agent.sh`
4. Verify application startup and health checks
5. Monitor logs at `/data/java/java-package/livo-agent/logs/livo-agent-log.txt`

## Governance

This constitution supersedes all other development practices and coding standards. All team members and AI assistants MUST comply with these principles.

**Amendment Procedure**: Changes to this constitution require:
1. Documentation of rationale for the change
2. Impact analysis on existing codebase
3. Team review and approval
4. Version increment according to semantic versioning rules
5. Update of all dependent templates and documentation

**Compliance Review**: All PRs and code reviews MUST verify compliance with constitution principles. Violations MUST be addressed before merge. Complexity violations MUST be justified in the Complexity Tracking section of implementation plans.

**Version**: 1.0.0 | **Ratified**: 2025-12-28 | **Last Amended**: 2025-12-28
