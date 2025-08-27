import { api } from "../_network/api"

export type LoginRequest = {
  username: string,
  password: string,
}

export type LoginResponse = {
  access_token: string,
  valid_until: number,
}

export type Actor = {
  id: string;
  username: string;
  type: 'ADMIN'|'USER';
}

export const loginUser = (data: LoginRequest): Promise<LoginResponse> => {
  return api({
    url: 'auth/user/login',
    method: 'POST',
    skipAuth: true,
    body: data,
  })
}

export const loginAdmin = (data: LoginRequest): Promise<LoginResponse> => {
  return api({
    url: 'auth/admin/login',
    method: 'POST',
    skipAuth: true,
    body: data,
  })
}

export const getMe = (): Promise<Actor> => {
  return api({
    url: 'auth/me',
    method: 'GET',
  })
}