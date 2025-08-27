import { getAdminAuth, getUserAuth } from "../_auth";

export type APIOptions = {
  method?: 'GET'|'POST',
  url: string,
  body?: any,
  skipAuth?: boolean,
}

export type APIError = {
  code: number,
  message: string,
  details: { field: string, error: string }[],
}

export function isAPIError(obj: unknown): obj is APIError {
  return (
    obj &&
    typeof obj === 'object' &&
    (obj as any).code &&
    typeof (obj as any).code === 'number' &&
    (obj as any).message &&
    typeof (obj as any).message === 'string' &&
    (obj as any).details &&
    Array.isArray((obj as any).details)
  )
}

export class ErrorAPI extends Error {
  statusCode: number;
  code: APIError['code'];
  message: APIError['message'];
  details: APIError['details'];

  constructor(statusCode: number, payload: APIError) {
    super(payload.message);
    this.statusCode = statusCode;
    this.code = payload.code,
    this.message = payload.message;
    this.details = payload.details;
  }
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:31001';

export async function api<T extends any>(opts: APIOptions): Promise<T> {
  try {
    if (opts.url.startsWith('/')) {
      opts.url = opts.url.substring(1);
    }
    const url = `${API_BASE_URL}/${opts.url}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    }
    if (!opts.skipAuth) {
      const adminAuth = getAdminAuth();
      const userAuth = getUserAuth();
      const token = adminAuth?.access_token ? adminAuth.access_token : userAuth?.access_token ? userAuth.access_token : '';
      headers['Authorization'] = `Bearer ${token}`;
    }
    const httpResp = await fetch(url, {
      headers,
      method: opts?.method || 'GET',
      body: opts?.body ? JSON.stringify(opts.body) : null,
    })

    if (httpResp.status >= 400) {
      if (httpResp.headers.get('content-type')?.includes('application/json')) {
        const errBody = await httpResp.json();
        if (isAPIError(errBody)) {
          throw new ErrorAPI(httpResp.status, errBody);
        }
      }

      const text = await httpResp.text();
      throw new Error(text);
    }

    const resp = await httpResp.json() as T;
    return resp;
  } catch(e) {
    if (e instanceof ErrorAPI || e instanceof Error) {
      throw e;
    }
    throw new Error(`Error: ${(e as any).message ? (e as any).message : e}`);
  }
}