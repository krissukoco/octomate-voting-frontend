export const ADMIN_AUTH_KEY = 'octomate-voting.auth.admin';
export const USER_AUTH_KEY = 'octomate-voting.auth.user';

export type AuthStoragePayload = {
  access_token: string,
  valid_until: number,
}

export function removeUserAuth(): void {
  localStorage.removeItem(USER_AUTH_KEY);
}

export function setUserAuth(payload: AuthStoragePayload): boolean {
  const now = Math.ceil(Date.now()/1000);
  if (payload.valid_until < now) return false;
  const str = JSON.stringify(payload);
  localStorage.setItem(USER_AUTH_KEY, str);
  return true;
}

export function getUserAuth(): AuthStoragePayload|null {
  try {
    const str = localStorage.getItem(USER_AUTH_KEY);
    if (!str) return null;
    const payload = JSON.parse(str) as AuthStoragePayload;
    // validate
    const now = Math.ceil(Date.now()/1000);
    if (
      payload && 
      payload.access_token && 
      typeof payload.access_token === 'string' && 
      payload.valid_until &&
      typeof payload.valid_until === 'number' &&
      payload.valid_until > now
    ) {
      return payload
    }
    removeUserAuth();
    return null;
  } catch(e) {
    removeUserAuth();
    return null
  }
}

export function removeAdminAuth(): void {
  localStorage.removeItem(ADMIN_AUTH_KEY);
}

export function setAdminAuth(payload: AuthStoragePayload): boolean {
  const now = Math.ceil(Date.now()/1000);
  if (payload.valid_until < now) return false;
  const str = JSON.stringify(payload);
  localStorage.setItem(ADMIN_AUTH_KEY, str);
  return true;
}

export function getAdminAuth(): AuthStoragePayload|null {
  try {
    const str = localStorage.getItem(ADMIN_AUTH_KEY);
    if (!str) return null;
    const payload = JSON.parse(str) as AuthStoragePayload;
    // validate
    const now = Math.ceil(Date.now()/1000);
    if (
      payload && 
      payload.access_token && 
      typeof payload.access_token === 'string' && 
      payload.valid_until &&
      typeof payload.valid_until === 'number' &&
      payload.valid_until > now
    ) {
      return payload
    }
    removeAdminAuth();
    return null;
  } catch(e) {
    removeAdminAuth();
    return null
  }
}