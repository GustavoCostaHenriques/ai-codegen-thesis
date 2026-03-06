import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { StudentAddressService } from '../service/student-address.service';
import { IStudentAddress } from '../student-address.model';
import { StudentAddressFormService } from './student-address-form.service';

import { StudentAddressUpdateComponent } from './student-address-update.component';

describe('StudentAddress Management Update Component', () => {
  let comp: StudentAddressUpdateComponent;
  let fixture: ComponentFixture<StudentAddressUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let studentAddressFormService: StudentAddressFormService;
  let studentAddressService: StudentAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentAddressUpdateComponent],
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
      .overrideTemplate(StudentAddressUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudentAddressUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    studentAddressFormService = TestBed.inject(StudentAddressFormService);
    studentAddressService = TestBed.inject(StudentAddressService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const studentAddress: IStudentAddress = { id: 19366 };

      activatedRoute.data = of({ studentAddress });
      comp.ngOnInit();

      expect(comp.studentAddress).toEqual(studentAddress);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentAddress>>();
      const studentAddress = { id: 10602 };
      jest.spyOn(studentAddressFormService, 'getStudentAddress').mockReturnValue(studentAddress);
      jest.spyOn(studentAddressService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentAddress });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studentAddress }));
      saveSubject.complete();

      // THEN
      expect(studentAddressFormService.getStudentAddress).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(studentAddressService.update).toHaveBeenCalledWith(expect.objectContaining(studentAddress));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentAddress>>();
      const studentAddress = { id: 10602 };
      jest.spyOn(studentAddressFormService, 'getStudentAddress').mockReturnValue({ id: null });
      jest.spyOn(studentAddressService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentAddress: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studentAddress }));
      saveSubject.complete();

      // THEN
      expect(studentAddressFormService.getStudentAddress).toHaveBeenCalled();
      expect(studentAddressService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentAddress>>();
      const studentAddress = { id: 10602 };
      jest.spyOn(studentAddressService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentAddress });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(studentAddressService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
