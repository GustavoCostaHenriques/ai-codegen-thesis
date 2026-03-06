# Technical Requirements — Weekly Planning Web Application

## 1. Objective

Develop a web application for weekly work planning, allowing:

- Assigning multiple projects per day
- Assigning one or more people per project, on each day
- Registering tasks (text) performed by each person in their respective projects

The application must be:

- Simple
- Secure
- Extensible
- Aligned with software engineering best practices

---

## 2. Technology Stack

### Backend
- Java 17+
- Spring Boot
- MVC architecture
- Maven
- PostgreSQL (MANDATORY in all environments)
- JPA / Hibernate
- REST API (JSON)
- Redis

### Frontend
- Angular
- Component-based architecture
- REST communication
- i18n (minimum PT / EN)

### Infrastructure
- Docker (docker-compose)
- Separate containers:
  - backend
  - frontend
  - database
- Persistent volumes for database

---

## 3. General Architecture

### Architectural Patterns
- MVC on backend
- Clear separation:
  - Controller (REST)
  - Service (business logic)
  - Repository (persistence)
- DTOs for API communication
- Bean Validation (Jakarta Validation)

### Backend Structure
- controller
- service
- repository
- domain / entity
- dto
- mapper
- config
- security

---

## 4. Domain Model

### Core Entities
- Account
- Person
- Project
- Week
- DayPlan
- DayProject
- DayProjectPerson
- Task

### IMPORTANT: Account ↔ Person Relationship

- Each Person corresponds to exactly ONE Account
- Each Account corresponds to exactly ONE Person
- There is a DEFAULT ADMIN account at system initialization

Creating a Person implies creating an Account.

### Relationships (Planning Model — UPDATED)

- Week → 1..N DayPlan
- DayPlan → 1..N DayProject
- DayProject → 1..N DayProjectPerson
- DayProjectPerson → 1..N Task

This supports:
- Multiple projects per day
- Multiple people per project
- Multiple tasks per person per project

---

## 5. Account & Person Lifecycle Rules

### Creating Persons (ADMIN only)

When an ADMIN creates a Person:

- Username
- Email
- Password
- Role (ADMIN / VIEWER)
- Status (ACTIVE / INACTIVE)

This operation:
- Creates a new Account
- Creates the corresponding Person
- Links them 1:1

Passwords MUST:
- Be hashed
- NEVER be exposed

### Change Password (Authenticated Users)

There MUST be a Change Password operation containing:

- Username
- Current password
- New password
- Confirm new password

---

## 6. Enumerations (Domain Constraints)

### AccountRole
- ADMIN
- VIEWER

### PersonStatus
- ACTIVE
- INACTIVE

### ProjectStatus
- ACTIVE
- INACTIVE

### WeekStatus
- PLANNED
- COMPLETED

Rules:

- Week is created as PLANNED
- Only ADMIN can change WeekStatus
- When WeekStatus = COMPLETED:
  - Planning operations are FORBIDDEN
  - Week becomes read-only

---

## 7. Role-Based Access Rules (CRITICAL)

### ADMIN

Can:
- Create/edit/delete Persons (Accounts)
- Create/edit/delete Projects
- Create/edit/delete Weeks
- Perform ALL planning operations
- Change Week status
- Change role/status of Persons
- Export statistics document

### VIEWER

Can:
- View Weeks overview
- View Weekly Planning
- View Person and Project Management

CRITICAL RESTRICTION:

A VIEWER user MUST ONLY see planning entries that belong to THEIR OWN Person.

VIEWER users:
- Cannot modify planning

---

## 8. Planning Rules (UPDATED LOGIC)

### Business Rules

- A day MAY have zero or more projects.
- A project MAY have zero or more people assigned on that day.
- A person MUST NOT be duplicated for the same project on the same day.
- A project MUST NOT be duplicated on the same day.
- Tasks are mandatory when created (minimum length configurable).
- Removing last project from a day is ALLOWED.
- Removing last person from a project is ALLOWED.

---

## 9. Design Structure

### 9.1 Screens

> Overall goal: each screen must have a clear visual design so that the user understands how the layout application is going to look. The layout must remain clean, readable, and visually balanced at all times. In each respect the screen sctructure described!

---

#### 1) Login Screen

**Screen structure**
- One centered “Auth Card” (main login container) with a fixed, readable width.
- Inside the card:
  1) Title (e.g., “Login”)
  2) Authentication fields (Username and Password)
  3) Actions (login and change password)

**Components**
- **Username** (input)
  - Clear label (e.g., “Username”)
  - Error state if empty after submit attempt.
- **Password** (input)
  - Clear label (e.g., “Password”)
  - Error state if empty after submit attempt.
- **Change password text below the Password field**
  - Rendered immediately below the password input, left-aligned.
  - Clicking opens the **Change Password** modal (see section 10).
- **Language selector**
  - Visible and accessible (e.g., dropdown) without cluttering the card.
  - Preferred placement: top-right of the card (or top of the screen), consistently applied.

**Feedback**
- Authentication errors shown in it's respective fields.

---

#### 2) Weeks Overview Screen

**Screen structure**
- Shared top navigation menu (see “Navigation Menu”).
- Main content area with a table of weeks.

**Weeks table**
- Each row/card must show:
  - Week code (ex: W1Feb2026)
  - Week range (Week Start – Week End)
  - Status (PLANNED/COMPLETED)
  - Actions (Open, Edit, Duplicate and Delete - 4 buttons with different colors)
- Interaction:
  - **Open week** by clicking the row (or on the “Open” button) to go to **Weekly Planning Screen** for that week.

---

#### 3) Weekly Planning Screen

**Screen structure**
- Shared top navigation menu.
- Main area divided into:
  1) Left sidebars → Active Persons list and Active Projects list
  2) Central area → Weekly planning board (Monday–Friday). THe days have to be all in the same horizontal plane. They cannot be on top of each other. They all have to be alligned, if needed the user will scroll to the sides and up and down.

---

### Default Behavior

- When a week is opened:
  - All ACTIVE projects must appear for every day.
  - Only ACTIVE persons appear in the left sidebar.
- If WeekStatus = COMPLETED:
  - Screen becomes read-only (no modifications allowed).

---

### Left Sidebars — Active Persons and Projects

- Displays all ACTIVE persons and projects.
- Each person and project appears once.
- Supports drag behavior.
- VIEWER cannot see this sidebar.
- Must have a small width so that does not take a lot of space from the main calendar

---

### Weekly Planning Board

For each day:
- All ACTIVE projects are displayed.
- Each project appears once per day.
- Projects may contain zero or more assigned persons.
- To see the tasks of a specific person the user as to click on the person and it opens a modal with the tasks

Note: The only thing that each day has is the following:
- A list of projects and a list of people inside each project (the list os tasks only appears by clicking on a person)

---

### Drag and Drop Logic

- Admin drags a Person from the left sidebar into a Project on a specific Day.
- On drop:
  - A DayProjectPerson association is created.
  - A task input card does not open imadiately, only after the user clicks on the person already inserted in the project.

---

### Task Creation

- The task card represents:
  - One Day
  - One Project
  - One Person
- Saving creates a Task linked to that association.

- Rules:
  - A person MUST NOT be duplicated in the same project on the same day.
  - For each DayProjectPerson association, the planning board must display and store two numeric fields:
    - Estimated Hours (defined by ADMIN)
    - Actual Hours (defined by the assigned Person)
  - These values must be visually represented as:
    [ Estimated Hours : Actual Hours ]
    - Example: [ 2h : 3h ]

---

### Removal Rules

This rules will be created by buttons alligned with the object it self

- Removing a Person from a Project:
  - Deletes the DayProjectPerson association.
  - Deletes associated Tasks.

- Removing a Project from a Day:
  - Requires confirmation modal or is blocked.

VIEWER users cannot modify planning.

---

#### 4) Person Management Screen

**Screen structure**
- Shared top navigation menu.
- Create Person button above the top left of the table
- Main area with a table of persons (accounts).

**Table**
- Columns:
  - Name
  - Email
  - Role
  - Status
  - Actions (Edit, Delete)


**Security rule**
- Passwords must never be displayed (not in lists, not in details).

**Open modal**
- By clicking the Create, Edit or Delete buttons it will open the respective modals
- Make sure that the table fits inside the screen

---

#### 5) Project Management Screen

**Screen structure**
- Shared top navigation menu.
- Create button above the top left of the table
- Main area with a table of projects.

**Table**
- Columns:
  - Name
  - Code
  - Status
  - Actions (Edit, Delete)

**Open modal**
- By clicking the Create, Edit or Delete buttons it will open the respective modals
- Make sure that the table fits inside the screen

---

### Navigation Menu (Screens 2–5)

**Type**
- Shared top bar across:
  - Weeks Overview
  - Person Management
  - Project Management

**Layout**
- Left: current screen title (ex: Project Management)
- Right: navigation buttons
  - Weeks Overview
  - Person Management
  - Project Management
  - Statistics - Opens the statistics modal
  - Logout

**States**
- Active screen: primary color
- Inactive screens: secondary color

---

## 10. Modals (MANDATORY)

### Required modals

1) **Create / Edit Week**
- Input fields:
  - Week Start
  - Week End
  - Status
- Note: When creating a week it is created a code that makes sense for that week (ex: W1Feb2026) (For development phases ONLY)

2) **Remove Week**
- A text saying that the week X is going to be removed
- Buttons:
  - Cancel
  - Confirm

3) **Create / Edit Person**
- Input fields:
  - Username
  - Password
  - Email
  - Role
  - Status
- Buttons:
  - Cancel
  - Confirm

4) **Create / Edit Project**
- Input fields:
  - Name
  - Code
  - Status
- Buttons:
  - Cancel
  - Confirm

5) **Change Password**
- Opened from the Login Screen via the text below the password field.
- Input fields:
  - Username
  - Current Password
  - New Password
  - Confirmation of New Password
- Buttons:
  - Cancel
  - Confirm

6) **Remove Project**
- A text saying that the project X is going to be removed and everything that it is associated with that project.
- Buttons:
  - Cancel
  - Confirm


7) **Statistics**

- Description:
  - A confirmation message asking whether the user wants to export a document containing all application statistics.
  - The document must include aggregated information about:
    - Persons
    - Projects
    - Weeks
    - Planning data (assignments and tasks)

- Buttons:
  - Confirm

- Behavior:
  - On Confirm:
    - The system must generate and download an Excel (.xlsx) file.
    - The file must contain structured statistical data covering:
      - Total persons (active/inactive)
      - Total projects (active/inactive)
      - Weeks overview (planned/completed)
      - Planning distribution per week
      - Project-person-task relationships

- Access restriction:
  - Only ADMIN users may open or execute this modal.

8) **Tasks Modal**
- A field that the user can edit describing the tasks for a specific person.
- Buttons:
 - Confirm (By clicking it, the task is saved)
 - Cancel

### Modal visual & behavior rules
- Smaller than full screens (must not occupy the entire viewport).
- Clearly associated with the parent screen context.
- Cancel button uses the secondary color.
- Rounded corners are allowed.
- Close behavior:
  - “X” button in the top corner (for the ones that don't have a cancel button)
  - Clicking outside (only if it does not risk losing entered data; otherwise require confirmation).

---

## 11. Dialogs

Dialogs:
- Used only for option lists
- No title
- Options fill full width
- Equal height
- No spacing between options
- No rounded corners

---

## 11. Resource Identification

All persistent resources MUST use UUID.

Applies to:
- Account
- Person
- Project
- Week
- Day-related entities
- Task

Sequential IDs are FORBIDDEN.

---

## 12. Security

- Passwords hashed
- JWT authentication
- RBAC enforced backend-side
- No password exposure
- SQL injection protection
- XSS protection
- Externalized secrets

---

## 13. Database Persistence

- PostgreSQL in ALL environments
- No in-memory databases
- Data persists after restart
- Docker volumes mandatory

---

## 14. Quality & Maintainability

### Code Quality
- Unit tests (Service layer)
- Integration tests (Controller layer)
- Defined minimum coverage

### Performance
- Optimized JPA queries
- Pagination in lists
- Lazy loading where appropriate

### Maintainability
- Modular code
- Clean separation
- 12-factor app principles
- Prepared for future growth

---

## 15. Test Environment Configuration

### Base URL
- The infrastructure layer MUST expose the application at:
  - http://localhost

The system MUST be accessible through this URL for local execution and automated testing.

### Test Users

The system MUST provide the following predefined user for testing purposes:

ADMIN
- Email: admin@weekly.local
- Password: admin12345
- Role: ADMIN

This user MUST exist after system initialization and be usable for automated authentication and authorization tests.