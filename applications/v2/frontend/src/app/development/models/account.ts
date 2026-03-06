export type AccountRole = 'ADMIN' | 'VIEWER';

export interface AccountSummary {
  id: string;
  username: string;
  role: AccountRole;
}

export interface AccountResponse {
  id: string;
  username: string;
  role: AccountRole;
}

export interface AccountCreateRequest {
  username: string;
  password: string;
  role: AccountRole;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn?: number;
  account: AccountSummary;
}

export interface StoredAccount extends AccountSummary {
  password: string;
}
