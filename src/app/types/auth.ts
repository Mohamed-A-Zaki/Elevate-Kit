// ==============================
// User Model
// ==============================
export interface User {
  id: number;
  name: string;
  email: string;
  image: string | null;
  phone: string;
}

// ==============================
// Auth Form Data
// ==============================
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

// ==============================
// API Responses
// ==============================
export interface LoginResponse {
  status_code: number;
  status: number;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface RegisterResponse {
  status_code: number;
  status: number;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LogoutResponse {
  status_code: number;
  status: string;
  message: string;
  data: null;
}
