import { PersonSummary } from './person';
import { ProjectSummary } from './project';
import { Week } from './week';

export interface Task {
  id: string;
  description: string;
}

export interface DayPersonProject {
  project: ProjectSummary;
  tasks: Task[];
}

export interface DayPerson {
  person: PersonSummary;
  projects: DayPersonProject[];
}

export interface DayPlan {
  date: string;
  people: DayPerson[];
}

export interface WeekPlanning extends Week {
  days: DayPlan[];
}
