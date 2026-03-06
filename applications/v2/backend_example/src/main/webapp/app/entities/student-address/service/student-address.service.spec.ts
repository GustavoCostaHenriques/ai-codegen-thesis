import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IStudentAddress } from '../student-address.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../student-address.test-samples';

import { StudentAddressService } from './student-address.service';

const requireRestSample: IStudentAddress = {
  ...sampleWithRequiredData,
};

describe('StudentAddress Service', () => {
  let service: StudentAddressService;
  let httpMock: HttpTestingController;
  let expectedResult: IStudentAddress | IStudentAddress[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(StudentAddressService);
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

    it('should create a StudentAddress', () => {
      const studentAddress = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(studentAddress).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StudentAddress', () => {
      const studentAddress = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(studentAddress).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StudentAddress', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StudentAddress', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StudentAddress', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStudentAddressToCollectionIfMissing', () => {
      it('should add a StudentAddress to an empty array', () => {
        const studentAddress: IStudentAddress = sampleWithRequiredData;
        expectedResult = service.addStudentAddressToCollectionIfMissing([], studentAddress);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studentAddress);
      });

      it('should not add a StudentAddress to an array that contains it', () => {
        const studentAddress: IStudentAddress = sampleWithRequiredData;
        const studentAddressCollection: IStudentAddress[] = [
          {
            ...studentAddress,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStudentAddressToCollectionIfMissing(studentAddressCollection, studentAddress);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StudentAddress to an array that doesn't contain it", () => {
        const studentAddress: IStudentAddress = sampleWithRequiredData;
        const studentAddressCollection: IStudentAddress[] = [sampleWithPartialData];
        expectedResult = service.addStudentAddressToCollectionIfMissing(studentAddressCollection, studentAddress);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studentAddress);
      });

      it('should add only unique StudentAddress to an array', () => {
        const studentAddressArray: IStudentAddress[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const studentAddressCollection: IStudentAddress[] = [sampleWithRequiredData];
        expectedResult = service.addStudentAddressToCollectionIfMissing(studentAddressCollection, ...studentAddressArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const studentAddress: IStudentAddress = sampleWithRequiredData;
        const studentAddress2: IStudentAddress = sampleWithPartialData;
        expectedResult = service.addStudentAddressToCollectionIfMissing([], studentAddress, studentAddress2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studentAddress);
        expect(expectedResult).toContain(studentAddress2);
      });

      it('should accept null and undefined values', () => {
        const studentAddress: IStudentAddress = sampleWithRequiredData;
        expectedResult = service.addStudentAddressToCollectionIfMissing([], null, studentAddress, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studentAddress);
      });

      it('should return initial array if no StudentAddress is added', () => {
        const studentAddressCollection: IStudentAddress[] = [sampleWithRequiredData];
        expectedResult = service.addStudentAddressToCollectionIfMissing(studentAddressCollection, undefined, null);
        expect(expectedResult).toEqual(studentAddressCollection);
      });
    });

    describe('compareStudentAddress', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStudentAddress(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 10602 };
        const entity2 = null;

        const compareResult1 = service.compareStudentAddress(entity1, entity2);
        const compareResult2 = service.compareStudentAddress(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 10602 };
        const entity2 = { id: 19366 };

        const compareResult1 = service.compareStudentAddress(entity1, entity2);
        const compareResult2 = service.compareStudentAddress(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 10602 };
        const entity2 = { id: 10602 };

        const compareResult1 = service.compareStudentAddress(entity1, entity2);
        const compareResult2 = service.compareStudentAddress(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
