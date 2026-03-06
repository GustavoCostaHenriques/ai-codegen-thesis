import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { WeekDetailComponent } from './week-detail.component';

describe('Week Management Detail Component', () => {
  let comp: WeekDetailComponent;
  let fixture: ComponentFixture<WeekDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./week-detail.component').then(m => m.WeekDetailComponent),
              resolve: { week: () => of({ id: 17262 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(WeekDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load week on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', WeekDetailComponent);

      // THEN
      expect(instance.week()).toEqual(expect.objectContaining({ id: 17262 }));
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
