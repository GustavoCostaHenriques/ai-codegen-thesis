import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IDayPlan } from '../day-plan.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../day-plan.test-samples';

import { DayPlanService, RestDayPlan } from './day-plan.service';

const requireRestSample: RestDayPlan = {
  ...sampleWithRequiredData,
  date: sampleWithRequiredData.date?.format(DATE_FORMAT),
};

describe('DayPlan Service', () => {
  let service: DayPlanService;
  let httpMock: HttpTestingController;
  let expectedResult: IDayPlan | IDayPlan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DayPlanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a DayPlan', () => {
      const dayPlan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dayPlan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DayPlan', () => {
      const dayPlan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dayPlan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DayPlan', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DayPlan', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DayPlan', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDayPlanToCollectionIfMissing', () => {
      it('should add a DayPlan to an empty array', () => {
        const dayPlan: IDayPlan = sampleWithRequiredData;
        expectedResult = service.addDayPlanToCollectionIfMissing([], dayPlan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dayPlan);
      });

      it('should not add a DayPlan to an array that contains it', () => {
        const dayPlan: IDayPlan = sampleWithRequiredData;
        const dayPlanCollection: IDayPlan[] = [
          {
            ...dayPlan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDayPlanToCollectionIfMissing(dayPlanCollection, dayPlan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DayPlan to an array that doesn't contain it", () => {
        const dayPlan: IDayPlan = sampleWithRequiredData;
        const dayPlanCollection: IDayPlan[] = [sampleWithPartialData];
        expectedResult = service.addDayPlanToCollectionIfMissing(dayPlanCollection, dayPlan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dayPlan);
      });

      it('should add only unique DayPlan to an array', () => {
        const dayPlanArray: IDayPlan[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dayPlanCollection: IDayPlan[] = [sampleWithRequiredData];
        expectedResult = service.addDayPlanToCollectionIfMissing(dayPlanCollection, ...dayPlanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dayPlan: IDayPlan = sampleWithRequiredData;
        const dayPlan2: IDayPlan = sampleWithPartialData;
        expectedResult = service.addDayPlanToCollectionIfMissing([], dayPlan, dayPlan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dayPlan);
        expect(expectedResult).toContain(dayPlan2);
      });

      it('should accept null and undefined values', () => {
        const dayPlan: IDayPlan = sampleWithRequiredData;
        expectedResult = service.addDayPlanToCollectionIfMissing([], null, dayPlan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dayPlan);
      });

      it('should return initial array if no DayPlan is added', () => {
        const dayPlanCollection: IDayPlan[] = [sampleWithRequiredData];
        expectedResult = service.addDayPlanToCollectionIfMissing(dayPlanCollection, undefined, null);
        expect(expectedResult).toEqual(dayPlanCollection);
      });
    });

    describe('compareDayPlan', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDayPlan(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 25287 };
        const entity2 = null;

        const compareResult1 = service.compareDayPlan(entity1, entity2);
        const compareResult2 = service.compareDayPlan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 25287 };
        const entity2 = { id: 14911 };

        const compareResult1 = service.compareDayPlan(entity1, entity2);
        const compareResult2 = service.compareDayPlan(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 25287 };
        const entity2 = { id: 25287 };

        const compareResult1 = service.compareDayPlan(entity1, entity2);
        const compareResult2 = service.compareDayPlan(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
