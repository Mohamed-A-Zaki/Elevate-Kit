export interface Position {
  id: string;
  name: string;
}

export interface UpdatePositionPayload {
  id: number;
  data: Omit<Position, "id">;
}

export interface PositionsFilters {
  page?: number;
  pagesize?: number;
}

export interface GetPositionsResponse {
  results: Position[];
  totalPages: number;
}
