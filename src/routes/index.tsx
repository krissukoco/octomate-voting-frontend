import type { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useAuthContext } from "../context/auth";
import LoginPage from "../pages/login";
import { AdminHomePage } from "../pages/admin/home";
import UserHomePage from "../pages/users/home";
import UserListPage from "../pages/admin/user-list";
import AdminVotePage from "../pages/admin/vote";
import UserCreatePage from "../pages/admin/user-create";

const AppRoutes: FC = () => {
  const auth = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        {auth.authenticatedAs === 'ADMIN' ? (
          <>
            <Route path='' element={<AdminHomePage />} />
            <Route path='/users' element={<UserListPage />} />
            <Route path='/users/create' element={<UserCreatePage />} />
            <Route path='/votes' element={<AdminVotePage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </>
        ) : auth.authenticatedAs === 'USER' ? (
          <>
            <Route path='' element={<UserHomePage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<Navigate to='login'/>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;