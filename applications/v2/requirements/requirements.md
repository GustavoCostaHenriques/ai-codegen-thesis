# Technical Requirements — Weekly Planning Web Application

## 1. Objective

Develop a web application for weekly work planning, allowing:

- Assigning multiple people per day
- Assigning one or more projects per person, on each day
- Registering tasks (text) performed by each person in their respective projects

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
- Redis

### Frontend
- Angular
- Component-based architecture
- Communication via REST API
- i18n support (minimum PT(pt) / EN)

### Infrastructure
- Docker (`docker-compose` for local environments)
- Separate containers for:
  - backend
  - frontend
  - database

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
- Person
- Project
- Week
- DayPlan
- DayPerson
- DayPersonProject
- Task

### Relationships (simplified)

- Week → 1..N DayPlan
- DayPlan → 1..N DayPerson
- DayPerson → 1..N Project
- Project → 1..N Task

This model allows:
- multiple people per day
- multiple projects per person
- multiple tasks per project

---

## 5. Features (API / Business Logic)

### Core management (ADMIN only)

- CRUD for People
- CRUD for Projects

### Weekly planning (ADMIN only)

- Create / edit week 
- For each day:
  - add / remove people
  - associate projects per person
  - define tasks (free text)

### Business rules

- A day MAY have zero or more people assigned.
- A person on a given day MAY have zero or more projects.
- Projects MUST NOT be duplicated for the same person on the same day.
- Tasks are mandatory when created (minimum number of characters configurable).
- A person MUST NOT be duplicated on the same day.
- Removing the last person from a day is ALLOWED.
- Removing the last project from a person on a given day is ALLOWED.

### Domain Modelling Rules

- DO NOT MIX authentication concepts with business domain concepts.
  - "AccountRole" is an AUTHORIZATION enum for authentication accounts only.
  - A "Person" is a business-domain resource used in planning and scheduling
    and is independent from authentication accounts.
  - Person.role MUST represent a job title / function used in planning,
    and MUST NOT use AccountRole.

### Enumerations (Domain Constraints)

The following enumerations define fixed domain constraints and MUST be enforced
both at API validation level and persistence level.

#### AccountRole
Defines the authorization level of an authenticated account.

- ADMIN  
  - Full administrative access
  - Can manage persons, projects, weeks, and planning
  - Can change week lifecycle state
- VIEWER  
  - Read-only access
  - Can view weeks, planning, people, projects, and tasks
  - MUST NOT perform administrative or planning actions

#### PersonStatus
Defines whether a person is currently available for planning.

- ACTIVE  
  - Person can be assigned to weeks and days
- INACTIVE  
  - Person cannot be assigned to planning
  - Historical data MUST remain visible

#### ProjectStatus
Defines the lifecycle state of a project.

- ACTIVE  
  - Project can be assigned in planning
- INACTIVE  
  - Project cannot be assigned
  - Historical assignments remain visible

#### WeekStatus
Defines the lifecycle state of a planning week.

- PLANNED  
  - Week is open for planning and modification
- COMPLETED  
  - Week is closed and immutable for planning operations

The Week status is SYSTEM-MANAGED.

- A Week is created with status `PLANNED`.
- Only ADMIN users are allowed to change the Week status 
  (this means that in the CreateWeekRequest or UpdateWeekRequest the field status has to exist).
- Status transitions MUST be performed through explicit administrative actions.
- Week status MUST NOT be treated as a freely editable field.

Once a Week reaches status `COMPLETED`:
- Planning operations (add/remove people, projects, or tasks) are FORBIDDEN.
- The Week becomes read-only for all users.

### Core Resource Groups

The API MUST include paths related to the following conceptual areas:

#### Weeks
Paths related to the management and retrieval of planning weeks.

These paths allow:
- listing existing weeks
- creating and removing weeks
- retrieving basic information about a specific week

#### People
Paths related to people used in the planning process.

These paths allow:
- creating, editing, and deleting people
- listing available people
- retrieving person-related information used in planning

People represent real individuals used in weekly planning and are
independent from authentication accounts.

#### Projects
Paths related to projects that can be assigned to people during planning.

These paths allow:
- creating, editing, and deleting projects
- listing available projects
- retrieving project-related information

#### Weekly Planning
Paths dedicated to weekly planning operations.

These paths allow:
- retrieving the complete planning of a given week
- assigning people to specific days
- associating projects with people on specific days
- registering tasks under a project for a person on a given day
- removing people, projects, or tasks from the planning

#### Accounts
- Accounts MUST NOT be exposed as a full CRUD REST resource
- The API MUST only expose:
  - authentication (login)
  - account creation (from the Login Screen)
- Listing, updating, or deleting accounts via API is FORBIDDEN

#### Roles

- Each protected operation MUST declare allowed roles using:
   x-roles:
     - ADMIN
     - VIEWER
- Login and Account creation are public

---

## 6. Security and Authentication

### Authentication

- The application MUST implement authentication internally, managed by the backend.
- Authentication is based on:
  - username
  - password
- Credentials MUST be stored in a persistent relational database.
- Authentication MUST be enforced in all execution profiles, including development.

- After successful login, the backend MUST issue a JSON Web Token (JWT).
- The JWT represents the authenticated Account identity and assigned role(s).
- All protected API requests MUST include a valid JWT.

### Authorization

- The system MUST implement role-based access control (RBAC).
- The following roles MUST exist:
  - ADMIN
  - VIEWER

- Permissions:
  - ADMIN:
    - create, edit, and delete Persons
    - perform all planning and administrative actions
  - VIEWER:
    - view weeks, planning, projects, persons, and tasks
    - MUST NOT perform administrative or planning actions

- Access control MUST be enforced at the backend level per endpoint.

### Security Best Practices

- Passwords MUST be stored securely (hashed, never in plain text).
- Input validation MUST be enforced on all API endpoints.
- Protection against common vulnerabilities:
  - SQL Injection
  - XSS
- JWT secrets and security-related configuration MUST be externalized.

### Conceptual Separation

- An Account represents authentication and authorization data only.
- Accounts are used exclusively for login and access control.
- Accounts are NOT part of the business domain and are NOT used in weekly planning.
- Persons represent real people used in planning and scheduling and are independent of Accounts.

---

## 7. Database Persistence (MANDATORY)

- The application MUST use PostgreSQL as the database in all environments.
- In-memory databases (e.g. H2 in-memory) MUST NOT be used.
- Data MUST remain available after application restart.
- Database persistence MUST be ensured via Docker volumes.

---

## 8. Standards and Guidelines

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

## 9. Internationalization (i18n)

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

## 10. UI / UX (technical guidance)

### 10.1 Screens

1. **Login Screen**
   - Username and password authentication
   - Language selection (PT / EN)
   - The Login Screen MUST include a clear action to create a new account.
   - This action MUST open a modal ("Create Account Modal").
   - Account creation MUST NOT be accessible from any other screen.

2. **Weeks Overview Screen**
   - List of existing weeks
   - Actions:
     - open week
     - create week (ADMIN only)
     - delete week (ADMIN only)

3. **Weekly Planning Screen**

   - Calendar-style weekly view with parallel day columns (Monday–Friday).

   - Each day displays one or more PERSON-CENTRIC planning cards,
     where each card represents the work of a single person on that day.

   - Each planning card MUST:
     - be visually distinct from the background using a COLORED SURFACE
       (NOTE: not all cards need the same color)
     - you are allowed to use more colours thant the ones provided in the design but make sure that it all fits together
     - use rounded corners and generous internal padding
     - feel like a self-contained “focus area” for that person
     - avoid heavy borders; visual separation should come from shape, spacing, and color

   - The card layout MUST be PERSON-FIRST, not task-first.

   - Inside each planning card, content MUST be something like this example:

     ```
     <icon-person> Person Name
      <icon-project> Project 1
        <icon-task> Task 1
        <icon-task> Task 2
      <icon-project> Project 2
        <icon-task> Task 1     
     ```

   - The visual emphasis SHOULD communicate:
     “This person is working on these projects, doing these tasks.”

   - Multiple planning cards MAY appear in the same day column,
     stacked vertically with consistent spacing (for design purposes only).

   - Overlap between cards or internal elements is STRICTLY FORBIDDEN.

   - The screen MUST include a SINGLE primary action button labeled **"Week Actions"**
     positioned above the calendar on the top-left.

   - Activating this button MUST open the **Week Actions Dialog**,
     which displays a simple vertical list of available actions (Add Person to Day, Add Project to Person, Add Task, Remove Task from Project, Remove Person from Day, and Remove Project from Person).
     (no colors, no titles), each leading to its respective modal.


4. **Person Management Screen** (ADMIN only)
   - List of people
   - Actions:
     - create person
     - edit person
     - delete person
   - DO NOT CREATE MORE THAN THE CRUD FOR PEOPLE IN THIS SCREEN

5. **Project Management Screen** (ADMIN only)
   - List of projects
   - Actions:
     - create project
     - edit project
     - delete project

NOTE: The screen 2, 3, 4, and 5 must all share the same menu on the top. On this menu, the user can navigate between the screens. On the left it should have a title different for each screen. On the rigth it should have 4 buttons (Weeks Overview, Person Management, Project Management and Logout). The button selected should be in a primary color, the others in a secondary color.

---

### 10.2 Modals

Modals MUST be used for focused creation and editing actions.

At minimum, the following modals MUST exist:

- **Create / Edit Week Modal**
  - With Week Start, Week End and Status field
- **Add Person to Day Modal**
- **Add Project to Person Modal**
- **Add Task Modal**
  - With Day, Person, Project and Task description
  - Put the Person and Project fields in the same horizontal line so that all fields fit in the modal
- **Remove Task from Project Modal**
  - With Day, Person, Project and Task
- **Remove Person from Day Modal**
  - With Day and Person
- **Remove Project from Person Modal**
  - With Day, Person and Project
- **Create Account Modal**
  - Accessible ONLY from the Login Screen and with username, password and role
- **Create / Edit Person Modal**
  - With Name, Email, Role and Status
- **Create / Edit Project Modal**
  - With Name, Code, Owner and Status
  - The Owner has to be a dialog with the list of people that are active at the moment
- **Confirmation Modals** (e.g. delete actions)

All modals:
- are smaller than full screens
- are always associated with a parent screen
- should have a cancel button in a secondary color

--- 

### 10.3 Dialogs

Dialogs MUST be used for listing options.

(For design) - They should NOT have any title in them. ONLY the list of options.
Each option must fill all the horizontal space and have the same height. Between 
each option there should NOT be any space.

---

### 10.4 (FOR FRONTEND ONLY)
This section defines mandatory requirements for the frontend iteration.
These are required behavioral and design corrections.

#### 1. Weekly Planning Calendar – Visual Refinement (MANDATORY)

The weekly planning screen must be visually improved and aligned with the existing color system.

##### 1.1 Calendar Containers

The person/project/task containers inside each day column MUST:

- Use a visually balanced card layout
- Have rounded corners
- Use consistent spacing and padding
- Follow the system’s primary/secondary color palette
- Be visually consistent across all days

Containers must look structured, clean, and modern.

---

##### 1.2 Icons (MANDATORY)

Each hierarchical level MUST include an appropriate icon:

- Person → an icon of a profile
- Project → an icon of a folder
- Task → a check icon

Icons MUST:

- Be aligned with text
- Be subtle (not oversized)
- Use consistent color styling
- Improve clarity without clutter
- Respect visual hierarchy (Person > Project > Task)

Text must remain clearly readable.

---

#### 2. Week Actions Dialog – Position & Styling Fix (MANDATORY)

##### 2.1 Positioning

The "Week Actions" dialog MUST:

- Open directly below the "Week Actions" button
- Be anchored to the button (contextual dropdown behavior)
- NOT appear centered in the page
- NOT block the entire screen

##### 2.2 Typography & Visibility

- Text color must contrast correctly with background
- No text should blend into the background
- Button labels must be clearly readable
- Proper hover and focus states must be implemented

---

#### 3. Global Button Styling (MANDATORY)

All buttons in the application MUST:

- Have rounded edges
- Follow consistent border-radius across the system
- Use consistent hover and focus states
- Respect the global design system

Default sharp-edged buttons are not acceptable.

---

#### 4. Role-Based UI Behavior (CRITICAL – NON-NEGOTIABLE)

The frontend MUST strictly enforce role-based rendering.

##### 4.1 If user role = VIEWER

The UI MUST:

- NOT display the "Actions" column in:
  - People table
  - Projects table

- NOT display:
  - "Week Actions" button in the weekly planning screen
  - Orange warning text:  
    `"Week is completed and planning actions are disabled."`

Viewer must have a fully read-only experience.

##### 4.2 If user role = ADMIN

All management functionality must remain visible and accessible.

---

#### 5. Create Account – Functional Fix (MANDATORY)

The Create Account feature MUST:

- Correctly create a new account
- Persist it in the mock runtime storage (If the backend is not integrated yet)
- Allow login with the new credentials
- Respect role selection (ADMIN or VIEWER)
- Show proper validation and feedback messages

No silent failures are allowed.

---

#### 6. Design Consistency Rule

All refinements MUST:

- Preserve existing route structure
- Preserve service-layer API-first mapping
- NOT change API path constants
- NOT break existing feature wiring
- Maintain mock backend compatibility

---

### 7. Buttons

- All top navigation buttons MUST:
  - Have consistent horizontal spacing (minimum 12–16px gap).
  - Use rounded corners (minimum border-radius: 8px).
  - Use consistent padding (minimum 8px vertical / 16px horizontal).
  - Have clear hover and active states.

- The active page button MUST:
  - Be visually distinct (filled background).
  - Use white text.
  - Have slightly stronger emphasis (font-weight or subtle shadow).

--- 

### 10.5 Border Radius Rules (MANDATORY)

Rounded corners MAY be used to improve visual softness and aesthetics,
but ONLY on appropriate elements.

Rounded corners ARE ALLOWED on:
- Person / project / task containers inside the Weekly Planning Screen
- Modals
- Buttons
- Input fields

Rounded corners MUST NOT be used on:
- Tables
- The main calendar container of the Weekly Planning Screen
- The top navigation menu
- Lists inside dialogs (e.g. Week Actions Dialog)

Elements where rounded corners are forbidden MUST have straight,
clean edges to preserve structural clarity.

If rounded corners are applied to forbidden elements,
the design is considered incorrect.

---

## 11. Resource Identification and Lifecycle Rules

### Resource Identification

All persistent domain resources MUST use UUIDs as identifiers.

This applies to:
- Person
- Project
- Week
- Day-related planning entities
- Task

Numeric or sequential identifiers MUST NOT be used.

UUIDs are required to:
- prevent identifier enumeration
- improve security
- support distributed and scalable architectures
- avoid database-dependent identifier generation

---

## 12. Technical Metrics and Quality

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
