export interface IAppUser {
  id: number;
  name?: string | null;
}

export type NewAppUser = Omit<IAppUser, 'id'> & { id: null };
