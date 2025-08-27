import { api } from "../_network/api";
import type { PaginatedResponse } from "./common";

export type User = {
  id: string;
  username: string;
  first_password: string;
  created_at: string;
  updated_at: string;
}

export const getUsers = (page: number, size: number): Promise<PaginatedResponse<User>> => {
  return api({
    url: `admin/users?page=${page}&size=${size}`,
    method: 'GET',
  })
}