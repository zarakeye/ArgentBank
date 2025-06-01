export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
  loadingProfile: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
}