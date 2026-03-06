import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { WeekService } from '../service/week.service';
import { IWeek } from '../week.model';
import { WeekFormService } from './week-form.service';

import { WeekUpdateComponent } from './week-update.component';

describe('Week Management Update Component', () => {
  let comp: WeekUpdateComponent;
  let fixture: ComponentFixture<WeekUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let weekFormService: WeekFormService;
  let weekService: WeekService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WeekUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(WeekUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WeekUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    weekFormService = TestBed.inject(WeekFormService);
    weekService = TestBed.inject(WeekService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const week: IWeek = { id: 3727 };

      activatedRoute.data = of({ week });
      comp.ngOnInit();

      expect(comp.week).toEqual(week);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWeek>>();
      const week = { id: 17262 };
      jest.spyOn(weekFormService, 'getWeek').mockReturnValue(week);
      jest.spyOn(weekService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ week });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: week }));
      saveSubject.complete();

      // THEN
      expect(weekFormService.getWeek).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(weekService.update).toHaveBeenCalledWith(expect.objectContaining(week));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWeek>>();
      const week = { id: 17262 };
      jest.spyOn(weekFormService, 'getWeek').mockReturnValue({ id: null });
      jest.spyOn(weekService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ week: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: week }));
      saveSubject.complete();

      // THEN
      expect(weekFormService.getWeek).toHaveBeenCalled();
      expect(weekService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWeek>>();
      const week = { id: 17262 };
      jest.spyOn(weekService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ week });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(weekService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
