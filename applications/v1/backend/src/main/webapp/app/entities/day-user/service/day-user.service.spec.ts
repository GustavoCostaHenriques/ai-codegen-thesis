import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDayUser } from '../day-user.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../day-user.test-samples';

import { DayUserService } from './day-user.service';

const requireRestSample: IDayUser = {
  ...sampleWithRequiredData,
};

describe('DayUser Service', () => {
  let service: DayUserService;
  let httpMock: HttpTestingController;
  let expectedResult: IDayUser | IDayUser[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DayUserService);
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

    it('should create a DayUser', () => {
      const dayUser = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dayUser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DayUser', () => {
      const dayUser = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dayUser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DayUser', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DayUser', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DayUser', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDayUserToCollectionIfMissing', () => {
      it('should add a DayUser to an empty array', () => {
        const dayUser: IDayUser = sampleWithRequiredData;
        expectedResult = service.addDayUserToCollectionIfMissing([], dayUser);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dayUser);
      });

      it('should not add a DayUser to an array that contains it', () => {
        const dayUser: IDayUser = sampleWithRequiredData;
        const dayUserCollection: IDayUser[] = [
          {
            ...dayUser,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDayUserToCollectionIfMissing(dayUserCollection, dayUser);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DayUser to an array that doesn't contain it", () => {
        const dayUser: IDayUser = sampleWithRequiredData;
        const dayUserCollection: IDayUser[] = [sampleWithPartialData];
        expectedResult = service.addDayUserToCollectionIfMissing(dayUserCollection, dayUser);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dayUser);
      });

      it('should add only unique DayUser to an array', () => {
        const dayUserArray: IDayUser[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dayUserCollection: IDayUser[] = [sampleWithRequiredData];
        expectedResult = service.addDayUserToCollectionIfMissing(dayUserCollection, ...dayUserArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dayUser: IDayUser = sampleWithRequiredData;
        const dayUser2: IDayUser = sampleWithPartialData;
        expectedResult = service.addDayUserToCollectionIfMissing([], dayUser, dayUser2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dayUser);
        expect(expectedResult).toContain(dayUser2);
      });

      it('should accept null and undefined values', () => {
        const dayUser: IDayUser = sampleWithRequiredData;
        expectedResult = service.addDayUserToCollectionIfMissing([], null, dayUser, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dayUser);
      });

      it('should return initial array if no DayUser is added', () => {
        const dayUserCollection: IDayUser[] = [sampleWithRequiredData];
        expectedResult = service.addDayUserToCollectionIfMissing(dayUserCollection, undefined, null);
        expect(expectedResult).toEqual(dayUserCollection);
      });
    });

    describe('compareDayUser', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDayUser(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 14946 };
        const entity2 = null;

        const compareResult1 = service.compareDayUser(entity1, entity2);
        const compareResult2 = service.compareDayUser(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 14946 };
        const entity2 = { id: 24491 };

        const compareResult1 = service.compareDayUser(entity1, entity2);
        const compareResult2 = service.compareDayUser(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 14946 };
        const entity2 = { id: 14946 };

        const compareResult1 = service.compareDayUser(entity1, entity2);
        const compareResult2 = service.compareDayUser(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
