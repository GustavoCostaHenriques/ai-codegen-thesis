import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DayUserProjectDetailComponent } from './day-user-project-detail.component';

describe('DayUserProject Management Detail Component', () => {
  let comp: DayUserProjectDetailComponent;
  let fixture: ComponentFixture<DayUserProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayUserProjectDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./day-user-project-detail.component').then(m => m.DayUserProjectDetailComponent),
              resolve: { dayUserProject: () => of({ id: 8065 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DayUserProjectDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayUserProjectDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load dayUserProject on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DayUserProjectDetailComponent);

      // THEN
      expect(instance.dayUserProject()).toEqual(expect.objectContaining({ id: 8065 }));
    });
  });

  describe('PreviousState', () => {
    it('should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
