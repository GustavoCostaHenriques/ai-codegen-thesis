# Technical Requirements — Weekly Planning Web Application

## 1. Objective

Develop a web application for weekly work planning, allowing:

- Assigning multiple users per day
- Assigning one or more projects per user, on each day
- Registering tasks (text) performed by each user in their respective projects

The application must be **simple**, **secure**, **extensible**, and **aligned with software engineering best practices**.

---

## 2. Technology Stack

### Backend
- Java 17+
- Spring Boot
- MVC architecture
- Maven for dependency management
- PostgreSQL as the relational database
- JPA / Hibernate
- REST API (JSON)

### Frontend
- Angular
- Component-based architecture
- Communication via REST API
- i18n support (minimum PT / EN)

### Infrastructure
- Docker (`docker-compose` for local environments)
- Separate containers for:
  - backend
  - frontend
  - database
  - Keycloak

---

## 3. General Architecture

### Patterns
- MVC on the backend
- Clear separation between:
  - Controller (REST)
  - Service (business logic)
  - Repository (persistence)
- DTOs for API communication
- Validation with Bean Validation (Jakarta Validation)

### Organization (backend example)
- `controller`
- `service`
- `repository`
- `domain / entity`
- `dto`
- `mapper`
- `config`
- `security`

---

## 4. Data Model (logical level)

### Main entities
- User
- Project
- Week
- DayPlan
- DayUser
- DayUserProject
- Task

### Relationships (simplified)
- Week → 1..N DayPlan
- DayPlan → 1..N DayUser
- DayUser → 1..N Project
- Project → 1..N Task

This model allows:
- multiple users per day
- multiple projects per user
- multiple tasks per project

---

## 5. Features (API / Business Logic)

### Core management
- CRUD for Users
- CRUD for Projects

### Weekly planning (core)
- Create / edit week
- For each day:
  - add / remove users
  - associate projects per user
  - define tasks (free text)

### Business rules
- A day must have **≥ 1 user**
- A user on a given day must have **≥ 1 project**
- Projects cannot be duplicated for the same user on the same day
- Tasks are mandatory (minimum number of characters configurable)
- A user cannot be duplicated on the same day

---

## 6. Security and Authentication

### Authentication
- Keycloak
- OAuth2 / OpenID Connect
- Integration with Spring Security

### Authorization
- Suggested roles:
  - ADMIN
  - USER
- Access control per endpoint and per feature

### Security best practices OWASP
- Input validation (backend)
- Protection against:
  - SQL Injection
  - XSS
  - CSRF
- Security headers
- Secure session and token management

---

## 7. Standards and Guidelines

### ISO 27001
Apply principles of:
- Confidentiality
- Integrity
- Availability

Practical measures:
- Access control
- Audit logs (creation / update)
- Environment separation (dev / prod)
- Secret management via environment variables

### IEEE (best practices)
- Readable and documented code
- Clear separation of responsibilities
- Comments only when they add value
- Traceable versioning and history

---

## 8. Internationalization (i18n)

### Backend
- Externalized messages (e.g., validation messages)
- Support for multiple languages

### Frontend (Angular)
- i18n with translation files
- Minimum supported languages:
  - Portuguese
  - English
- Localized dates and formats

---

## 9. UI / UX (technical guidance)

### 9.1 Main Planning View (Week)

- The main planning screen must present the week as a calendar-like layout.
- Days of the week must be visually separated and displayed in parallel (e.g., columns).
- The layout must support side-by-side comparison of days.
- The design must prioritize temporal reasoning over deep vertical nesting.

### 9.2 Content Representation

- Each day displays:
  - assigned users
  - projects per user
  - tasks per project
- Users and projects should be visually grouped within each day.

### 9.3 Interaction Style

- The interface should resemble a planning board or calendar rather than a form.
- Creation and editing actions should be clearly distinguishable from displayed data.

### 9.4 Screens and Modals Specification (MANDATORY)

The application UI MUST be composed of the following **screens** and **modals**.

This list defines the **minimum required UI surface** and MUST be fully represented
in any generated design artefact.

#### Screens

1. **Login Screen**
   - User authentication via Keycloak
   - Language selection (PT / EN)

2. **Weeks Overview Screen**
   - List of existing weeks
   - Actions:
     - open week
     - create week
     - duplicate week
     - delete week (admin only)

3. **Weekly Planning Screen**
   - Calendar-style week view
   - Parallel day columns (Monday–Sunday)
   - Users, projects, and tasks displayed per day
   - Entry point for all planning-related actions

4. **User Management Screen**
   - List of users
   - Actions:
     - create user
     - edit user
     - delete user

5. **Project Management Screen**
   - List of projects
   - Actions:
     - create project
     - edit project
     - delete project

#### Modals

Modals MUST be used for focused creation and editing actions.

At minimum, the following modals MUST exist:

- **Create / Edit Week Modal**
- **Add User to Day Modal**
- **Assign Project to User Modal**
- **Add Task Modal**
- **Create / Edit User Modal**
- **Create / Edit Project Modal**
- **Confirmation Modals** (e.g. delete actions)

All modals:
- are smaller than full screens
- are always associated with a parent screen

### 9.5 Example-based Design Guidance

- The UI design may include illustrative example data (e.g., sample users, projects, tasks)
  to demonstrate how the interface is intended to be used.
- Example data is for visualization and validation purposes only and must not be treated
  as real or persisted data.

---

## 10. Technical Metrics and Quality

### Code
- Test coverage (minimum defined by the team)
- Unit tests (Service layer)
- Integration tests (Controller layer)

### Performance
- Optimized queries (JPA)
- Pagination in lists
- Lazy loading where applicable

### Maintainability
- Modular code
- Prepared for functional growth
- Externalized configuration (12-factor app)
