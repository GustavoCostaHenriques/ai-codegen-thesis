# Technical Requirements — Weekly Planning Web Application

## 1. Objective

Develop a web application for weekly work planning, allowing:

- Assigning multiple people per day
- Assigning one or more projects per person, on each day
- Registering tasks (text) performed by each person in their respective projects

The application must be:

- **Simple**
- **Secure**
- **Extensible**
- **Aligned with software engineering best practices**

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
- i18n (minimum PT-PT / EN)

### Infrastructure
- Docker (`docker-compose`)
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
- `controller`
- `service`
- `repository`
- `domain / entity`
- `dto`
- `mapper`
- `config`
- `security`

---

## 4. Domain Model

### Core Entities
- Account
- Person
- Project
- Week
- DayPlan
- DayPerson
- DayPersonProject
- Task

### IMPORTANT: Account ↔ Person Relationship

- Each **Person corresponds to exactly ONE Account**
- Each **Account corresponds to exactly ONE Person**
- There is a DEFAULT ADMIN account at system initialization

Persons are no longer independent from Accounts.
Creating a Person implies creating an Account.

### Relationships (Planning Model)

- Week → 1..N DayPlan
- DayPlan → 1..N DayPerson
- DayPerson → 1..N DayPersonProject
- DayPersonProject → 1..N Task

This supports:
- Multiple people per day
- Multiple projects per person
- Multiple tasks per project

---

## 5. Account & Person Lifecycle Rules

### Default System State

- The system starts with ONE default ADMIN account.

### Creating Persons (ADMIN only)

When an ADMIN creates a Person:

- Name
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

### Self Account Creation (Public)

When a user creates an account from the Login screen:

Required fields:
- Name
- Email
- Password

Automatically assigned:
- Role = VIEWER
- Status = ACTIVE

Role and Status MUST NOT be editable in this flow.

Only ADMIN users may later modify:
- Role
- Status

### Change Password (Authenticated Users)

There MUST be a Change Password modal containing:

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

### VIEWER

Can:
- View Weeks overview (only as an informative screen, all the actions here must be removed in viewer mode)
- View Weekly Planning
- View Person and Project Management screen, but without the actions column

CRITICAL RESTRICTION:

A VIEWER user MUST ONLY see planning cards that belong to THEIR OWN Person.

VIEWER users:
- Cannot modify planning

---

## 8. Planning Rules

### Business Rules

- A day MAY have zero or more people.
- A person MAY have zero or more projects per day.
- A project MUST NOT be duplicated for the same person on the same day.
- A person MUST NOT be duplicated on the same day.
- Tasks are mandatory when created (minimum length configurable).
- Removing last person from a day is ALLOWED.
- Removing last project from a person is ALLOWED.

---

### 9.1 Screens

> Overall goal: each screen must have a clear visual design so that the user understands how the layout application is going to look. The layout must remain clean, readable, and visually balanced at all times. In each respect the screen sctructure described!

---

#### 1) Login Screen

**Screen structure**
- Simple neutral background.
- One centered “Auth Card” (main login container) with a fixed, readable width.
- Inside the card:
  1) Title (e.g., “Login”)
  2) Authentication fields
  3) Actions (login + secondary actions)

**Components**
- **Username** (input)
  - Clear label (e.g., “Username”)
  - Error state if empty after submit attempt.
- **Password** (input)
  - Clear label (e.g., “Password”)
  - Optional visual affordance: show/hide password icon (does not change functionality).
- **Change password text below the Password field**
  - Rendered immediately below the password input, left-aligned.
  - Styled as a subtle but clearly clickable text-link / text-button.
  - Clicking opens the **Change Password** modal (see section 10).
- **Language selector**
  - Visible and accessible (e.g., dropdown) without cluttering the card.
  - Preferred placement: top-right of the card (or top of the screen), consistently applied.

**Actions**
- **Primary action:** “Login” (prominent button)
- **Secondary actions**
  - **Create Account** → opens the **Create Account** modal.
  - **Change Password** → triggered by the text below the password field.

**Feedback**
- Authentication errors shown in it's respective fields.

---

#### 2) Weeks Overview Screen

**Screen structure**
- Shared top navigation menu (see “Navigation Menu”).
- Main content area with a list/table of weeks.

**Weeks list**
- Each row/card must show:
  - Week code (ex: W1Feb2026)
  - Week range (Week Start – Week End)
  - Status (PLANNED/COMPLETED)
  - Actions (Open, Edit and Delete)
- Interaction:
  - **Open week** by clicking the row (or on the “Open” button) to go to **Weekly Planning Screen** for that week.

**Week actions**
- Provide week creation capabilities through this screen with a button on the top left of the table which opens the Create/Edut Week modal (modal + confirmation patterns defined in section 10).

---

#### 3) Weekly Planning Screen

**Screen structure**
- Shared top navigation menu (see “Navigation Menu”).
- Title saying "Planning for the week - <WeekCode>"
- Main content area with a calendar that shows the plan for a specific week.

**Visual purpose**
- Weekly calendar-style layout with day columns.
- Person-centric representation: instantly communicates who is working on which projects and tasks per day.
- Must remain structured and readable even with many items.

##### 3.1 Calendar Layout (base structure)
- **Monday–Friday columns** laid out in parallel.
- Each day column contains:
  1) Day header (e.g., “Monday - 2 Feb” )
  2) Vertical stack of planning cards
  3) In the bottom of the day column there's the button “Add Person” which opens the Add Person Modal

**Calendar visual rules**
- **No overlapping elements** and maintain clear spacing between all components.
- **Main calendar container has no rounded corners**.
- **Make sure that the calendar fits inside the screen**

##### 3.2 Day Column (content per day)
- **Day header**
  - Day name + date (compact but prominent typography) .
- **Add Person**
  - The **“Add Person”** button is placed **at the bottom of each day column**.
  - It must be visually tied to that day (not global).

##### 3.3 Planning Cards (one card = one person on one day)
**Core rule**
- Each card represents **ONE person on ONE day**.
- Cards are always stacked vertically inside the day column.

**Card styling**
- Light surface for readability.
- Avoid heavy borders; differentiate using:
  - spacing
  - subtle background contrast
  - and/or a small **secondary color** accent (e.g., a thin side bar or top accent strip).

**Mandatory internal hierarchy**
1) **Person header**
   - Person name at the top of the card (most prominent).
   - **Inline remove icon** next to the person name (trash can or similar).
2) **Projects list**
   - Projects grouped under the person.
   - Slight indentation to communicate hierarchy (Person → Projects → Tasks).
3) **Project sections**
   - Each project displayed as its own internal block with its tasks grouped underneath.

##### 3.4 Projects (inside a person card)
- Each project is a clearly separated block within the card (use light spacing and subtle grouping).
- **Project header**
  - Project name
  - **Inline remove icon** next to the project name (trash can or similar).
- **Add Project**
  - The **“Add Project”** button appears **at the bottom of the person card**, below the list of projects.
  - It must clearly belong to that person card on that day.

##### 3.5 Tasks (inside each project)
- Tasks are listed under the project header, with an additional small indentation.
- Each task row contains:
  - Task text
  - **Inline remove icon** (trash can or similar) on the same line.
- **Add Task**
  - The **“Add Task”** button is placed **at the bottom of the project section**, below the task list for that project.

##### 3.6 Interaction Rules (updated UX)
**Allowed interaction pattern**
- The weekly planning interface must work using only:
  - Buttons: **Add Person** (per day), **Add Project** (per person card), **Add Task** (per project)
  - Inline remove icons for:
    - Person (in the person header)
    - Project (in the project header)
    - Task (in the task row)

##### 3.7 Day colun example

+==============================================================+
|                       Monday - 2 Feb                         |
+==============================================================+
|                                                              |
|  +--------------------------------------------------------+  |
|  | Ana Silva                                        [X]   |  |
|  +--------------------------------------------------------+  |
|  |                                                        |  |
|  |========================================================|  |
|  | Atlas Migration [X]                                    |  |
|  |     • Migrate user table to UUIDs               [X]    |  |
|  |     • Update Liquibase changelog                [X]    |  |
|  |     • Verify OpenAPI contract                   [X]    |  |
|  |     [Add Task]                                         |  |
|  |========================================================|  |
|  | Weekly Planning UI [X]                                 |  |
|  |     • Align spacing + typography                 [X]   |  |
|  |     • Add secondary accent strip                 [X]   |  |
|  |     [Add Task]                                         |  |
|  |========================================================|  |
|  | [Add Project]                                          |  |
|  +--------------------------------------------------------+  |
|                                                              |
|  +--------------------------------------------------------+  |
|  | Bruno Costa                                     [X]    |  |
|  +--------------------------------------------------------+  |
|  |                                                        |  |
|  |========================================================|  |
|  | Auth & RBAC [X]                                        |  |
|  |     • Fix JWT login flow (dev)                  [X]    |  |
|  |     • ADMIN-only week actions                   [X]    |  |
|  |     [Add Task]                                         |  |
|  |========================================================|  |
|  | [Add Project]                                          |  |
|  +--------------------------------------------------------+  |
|                                                              |
|                         [Add Person]                         |
+==============================================================+

---

#### 4) Person Management Screen

**Screen structure**
- Shared top navigation menu.
- Create button above the top left of the table
- Main area with a list/table of persons (accounts).

**List/table**
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
- Main area with a list/table of projects.

**List/table**
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
  - Weekly Planning
  - Person Management
  - Project Management

**Layout**
- Left: current screen title (ex: Project Management)
- Right: navigation buttons
  - Weeks Overview
  - Person Management
  - Project Management
  - Logout

**States**
- Active screen: primary color
- Inactive screens: secondary color

---

## 10. Modals (MANDATORY)

### Required modals

1) **Create / Edit Week**
- Fields:
  - Week Start
  - Week End
  - Status
- Note: When creating a week it is created a code that makes sense for that week (ex: W1Feb2026)

2) **Remove Week**
- A text saying that the week is going with a specific code is going to be removed
- Buttons:
  - Cancel
  - Confirm

3) **Add Person to Day**
- Fields:
  - Day
  - Person
- Buttons:
  - Cancel
  - Confirm

4) **Add Project to Person**
- Fields:
  - Day
  - Person
  - Project
- Buttons:
  - Cancel
  - Confirm

5) **Add Task**
- Mandatory layout:
  - Day 
  - **Person + Project on the same horizontal line**
  - Task description below (text input)
- Fields:
  - Day
  - Person
  - Project
  - Task description
- Buttons:
  - Cancel
  - Confirm

6) **Remove Task**
- A text saying the task that is going to be removed, for a specific project.
- Buttons:
  - Cancel
  - Confirm

7) **Remove Person**
- A text saying the person that is going to be removed, for a specific day.
- Buttons:
  - Cancel
  - Confirm

8) **Remove Project**
- A text saying the project that is going to be removed, for a specific person.
- Buttons:
  - Cancel
  - Confirm

9) **Create Account (Login only)**
- Accessible only from the Login Screen.
- Fields:
  - Username
  - Email
  - Password
- Buttons:
  - Cancel
  - Confirm
- Note: The account will be with Role=Viewer and Status=Active by default

10) **Create / Edit Person**
- Fields:
  - Name
  - Password
  - Email
  - Role
  - Status
- Buttons:
  - Cancel
  - Confirm

11) **Create / Edit Project**
- Fields:
  - Name
  - Code
  - Status
- Buttons:
  - Cancel
  - Confirm

12) **Change Password**
- Opened from the Login Screen via the text below the password field.
- Fields:
  - Username
  - Current Password
  - New Password
  - Confirmation of New Password
- Buttons:
  - Cancel
  - Confirm

### Modal visual & behavior rules
- Smaller than full screens (must not occupy the entire viewport).
- Clearly associated with the parent screen context.
- Cancel button uses the secondary color.
- Rounded corners are allowed.
- Close behavior:
  - “X” button in the top corner
  - Escape key
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

## 12. Border Radius Rules (MANDATORY)

Rounded corners ALLOWED on:
- Planning cards
- Modals
- Buttons
- Inputs

Rounded corners FORBIDDEN on:
- Tables
- Main calendar container
- Top navigation menu
- Dialog lists

Violation = incorrect design.

---

## 13. Resource Identification

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

## 14. Security

- Passwords hashed
- JWT authentication
- RBAC enforced backend-side
- No password exposure
- SQL injection protection
- XSS protection
- Externalized secrets

---

## 15. Database Persistence

- PostgreSQL in ALL environments
- No in-memory databases
- Data persists after restart
- Docker volumes mandatory

---

## 16. Quality & Maintainability

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

## 17. Test Environment Configuration

### Base URL

- The infrastructure layer MUST expose the application at:
  - http://localhost
- The system MUST be accessible through this URL for local execution and automated testing.

### Test Users

The system MUST provide the following predefined users for testing purposes:

ADMIN
- Email: admin@weekly.local
- Password: admin12345
- Role: ADMIN

VIEWER
- Email: viewer@example.com
- Password: viewer12345
- Role: VIEWER

These users MUST exist after system initialization and be usable for automated authentication and authorization tests.
