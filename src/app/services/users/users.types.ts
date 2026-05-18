export interface User {
  id: string;
  name: string;
}

export interface UpdateUserPayload {
  id: string;
  data: Omit<User, "id">;
}

export interface UsersFilters {
  id?: string;
}
