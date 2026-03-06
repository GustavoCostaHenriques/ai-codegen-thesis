import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDayUserProject } from '../day-user-project.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../day-user-project.test-samples';

import { DayUserProjectService } from './day-user-project.service';

const requireRestSample: IDayUserProject = {
  ...sampleWithRequiredData,
};

describe('DayUserProject Service', () => {
  let service: DayUserProjectService;
  let httpMock: HttpTestingController;
  let expectedResult: IDayUserProject | IDayUserProject[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DayUserProjectService);
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

    it('should create a DayUserProject', () => {
      const dayUserProject = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dayUserProject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DayUserProject', () => {
      const dayUserProject = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dayUserProject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DayUserProject', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DayUserProject', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DayUserProject', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDayUserProjectToCollectionIfMissing', () => {
      it('should add a DayUserProject to an empty array', () => {
        const dayUserProject: IDayUserProject = sampleWithRequiredData;
        expectedResult = service.addDayUserProjectToCollectionIfMissing([], dayUserProject);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dayUserProject);
      });

      it('should not add a DayUserProject to an array that contains it', () => {
        const dayUserProject: IDayUserProject = sampleWithRequiredData;
        const dayUserProjectCollection: IDayUserProject[] = [
          {
            ...dayUserProject,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDayUserProjectToCollectionIfMissing(dayUserProjectCollection, dayUserProject);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DayUserProject to an array that doesn't contain it", () => {
        const dayUserProject: IDayUserProject = sampleWithRequiredData;
        const dayUserProjectCollection: IDayUserProject[] = [sampleWithPartialData];
        expectedResult = service.addDayUserProjectToCollectionIfMissing(dayUserProjectCollection, dayUserProject);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dayUserProject);
      });

      it('should add only unique DayUserProject to an array', () => {
        const dayUserProjectArray: IDayUserProject[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dayUserProjectCollection: IDayUserProject[] = [sampleWithRequiredData];
        expectedResult = service.addDayUserProjectToCollectionIfMissing(dayUserProjectCollection, ...dayUserProjectArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dayUserProject: IDayUserProject = sampleWithRequiredData;
        const dayUserProject2: IDayUserProject = sampleWithPartialData;
        expectedResult = service.addDayUserProjectToCollectionIfMissing([], dayUserProject, dayUserProject2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dayUserProject);
        expect(expectedResult).toContain(dayUserProject2);
      });

      it('should accept null and undefined values', () => {
        const dayUserProject: IDayUserProject = sampleWithRequiredData;
        expectedResult = service.addDayUserProjectToCollectionIfMissing([], null, dayUserProject, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dayUserProject);
      });

      it('should return initial array if no DayUserProject is added', () => {
        const dayUserProjectCollection: IDayUserProject[] = [sampleWithRequiredData];
        expectedResult = service.addDayUserProjectToCollectionIfMissing(dayUserProjectCollection, undefined, null);
        expect(expectedResult).toEqual(dayUserProjectCollection);
      });
    });

    describe('compareDayUserProject', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDayUserProject(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 8065 };
        const entity2 = null;

        const compareResult1 = service.compareDayUserProject(entity1, entity2);
        const compareResult2 = service.compareDayUserProject(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 8065 };
        const entity2 = { id: 11491 };

        const compareResult1 = service.compareDayUserProject(entity1, entity2);
        const compareResult2 = service.compareDayUserProject(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 8065 };
        const entity2 = { id: 8065 };

        const compareResult1 = service.compareDayUserProject(entity1, entity2);
        const compareResult2 = service.compareDayUserProject(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
