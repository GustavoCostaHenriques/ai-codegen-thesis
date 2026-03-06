import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DayUserDetailComponent } from './day-user-detail.component';

describe('DayUser Management Detail Component', () => {
  let comp: DayUserDetailComponent;
  let fixture: ComponentFixture<DayUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayUserDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./day-user-detail.component').then(m => m.DayUserDetailComponent),
              resolve: { dayUser: () => of({ id: 14946 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DayUserDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayUserDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should load dayUser on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DayUserDetailComponent);

      // THEN
      expect(instance.dayUser()).toEqual(expect.objectContaining({ id: 14946 }));
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
