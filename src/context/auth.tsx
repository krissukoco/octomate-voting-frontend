import { createContext, useCallback, useContext, useEffect, useState, type FC, type ReactNode } from "react";
import { 
  getMe,
  loginAdmin as loginAdminApi, 
  loginUser as loginUserApi, 
  type Actor,
  type LoginRequest,
} from "../_services/auth";
import toast from "react-hot-toast";
import { getAdminAuth, getUserAuth, removeAdminAuth, removeUserAuth, setAdminAuth, setUserAuth } from "../_auth";
import { ErrorAPI } from "../_network/api";

export type AuthContextPayload = {
  authenticatedAs: 'ADMIN'|'USER'|null;
  actor?: Actor;
  loggingIn: boolean;
  loginUser: (req: LoginRequest) => Promise<void>;
  loginAdmin: (req: LoginRequest) => Promise<void>;
  refetchActor: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextPayload>({
  authenticatedAs: null,
  actor: undefined,
  loggingIn: false,
  loginUser: async(_: LoginRequest) => {},
  loginAdmin: async(_: LoginRequest) => {},
  refetchActor: async() => {},
  logout: () => {},
})

export const AuthContextProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [authenticatedAs, setAuthenticatedAs] = useState<AuthContextPayload['authenticatedAs']>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [actor, setActor] = useState<Actor|undefined>(undefined);

  const refetchActor = useCallback(async() => {
    const adminAuth = getAdminAuth();
    const userAuth = getUserAuth();
    if (!adminAuth && !userAuth) return;

    setActor(undefined);
    try {
      const resp = await getMe();
      setActor(resp);
    } catch(e) {
      if (e instanceof ErrorAPI) {
        if (e.statusCode === 401) {
          removeAdminAuth();
          removeUserAuth();
          return
        }
      }
      toast.error((e as any)?.message ?? 'Unknown error');
    }
  }, [getAdminAuth, getUserAuth, removeAdminAuth, removeUserAuth, setActor])

  const reloadAuth = useCallback(() => {
    const adminAuth = getAdminAuth();
    if (adminAuth) {
      setAuthenticatedAs('ADMIN');
      refetchActor();
      return;
    }
    const userAuth = getUserAuth();
    if (userAuth) {
      setAuthenticatedAs('USER');
      refetchActor();
      return;
    }
    setAuthenticatedAs(null);
  }, [setAuthenticatedAs, getAdminAuth, getUserAuth, refetchActor])

  const loginUser = useCallback(async(req: LoginRequest) => {
    setLoggingIn(true);
    try {
      const resp = await loginUserApi(req);
      setUserAuth(resp);
      reloadAuth();
    } catch(e) {
      toast.error((e as any)?.message ?? 'Unknown error');
    } finally {
      setLoggingIn(false)
    }
  }, [loginUserApi, setUserAuth, reloadAuth, toast, setLoggingIn])

  const loginAdmin = useCallback(async(req: LoginRequest) => {
    setLoggingIn(true);
    try {
      const resp = await loginAdminApi(req);
      setAdminAuth(resp);
      reloadAuth();
    } catch(e) {
      toast.error((e as any)?.message ?? 'Unknown error');
    } finally {
      setLoggingIn(false);
    }
  }, [loginAdminApi, setAdminAuth, reloadAuth, toast, setLoggingIn]);

  const logout = useCallback(() => {
    removeAdminAuth();
    removeUserAuth();
    reloadAuth();
  }, [removeAdminAuth, removeUserAuth, reloadAuth])

  useEffect(() => {
    reloadAuth();
  }, [])

  return (
    <AuthContext.Provider 
      value={{ authenticatedAs, actor, refetchActor, loggingIn, loginAdmin, loginUser, logout }}
    >
      {(!authenticatedAs || actor) ? (
        children
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="loading loading-lg text-green-500"/>
        </div>
      )}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);