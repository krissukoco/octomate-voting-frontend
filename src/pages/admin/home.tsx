import { type FC } from "react";
import { useAuthContext } from "../../context/auth";
import { Link } from "react-router";

export const AdminHomePage: FC = () => {
  const auth = useAuthContext();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[500px] max-w-[500px]">
        <h1 className="text-4xl font-bold text-neutral-800 text-center">Hi, {auth.actor?.username || '-'}</h1>
        <p className="text-sm text-center mt-4 mb-2">Choose the menu below:</p>
        <div className="grid grid-cols-2 space-4 gap-4 mt-8">
          <Link to='/users'>
            <div
              className="flex flex-col gap-2 p-8 rounded-lg bg-amber-600 items-center text-white"
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h2 className="font-bold text-xl">Users</h2>
            </div>
          </Link>
          <Link to='/votes'>
            <div
              className="flex flex-col gap-2 p-8 rounded-lg bg-blue-600 items-center text-white"
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </div>
              <h2 className="font-bold text-xl">Votes</h2>
            </div>
          </Link>

          <div className="col-span-2 w-full">
            <button
              type='button'
              className="btn btn-lg btn-error w-full text-white"
              onClick={() => auth.logout()}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}