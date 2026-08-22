export interface Position {
  id: string;
  name: string;
}

export interface UpdatePositionPayload {
  id: number;
  data: Omit<Position, "id">;
}

export interface PositionsFilters {
  id?: string;
  pagesize?: number;
  page?: number;
}
