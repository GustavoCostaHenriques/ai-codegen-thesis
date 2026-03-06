import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ProjectsApiService } from '../../../core/services/api/projects-api.service';
import { SessionService } from '../../../core/services/session.service';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  const projectsApiServiceMock = {
    listProjects: jasmine.createSpy('listProjects').and.returnValue(
      of({
        content: [],
        page: {
          page: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0,
        },
      }),
    ),
    createProject: jasmine.createSpy('createProject').and.returnValue(of({})),
    updateProjectById: jasmine.createSpy('updateProjectById').and.returnValue(of({})),
    deleteProjectById: jasmine.createSpy('deleteProjectById').and.returnValue(of(void 0)),
  };

  const sessionServiceMock = {
    isAdmin: () => true,
  };

  const authServiceMock = {
    logout: jasmine.createSpy('logout').and.returnValue(of(void 0)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [
        provideRouter([]),
        { provide: ProjectsApiService, useValue: projectsApiServiceMock },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProjectComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should request project list on init', () => {
    const fixture = TestBed.createComponent(ProjectComponent);
    fixture.detectChanges();

    expect(projectsApiServiceMock.listProjects).toHaveBeenCalled();
  });
});
