export interface IStudentAddress {
  id: number;
  adressLine?: string | null;
  postalCode?: string | null;
  city?: string | null;
  country?: string | null;
}

export type NewStudentAddress = Omit<IStudentAddress, 'id'> & { id: null };
