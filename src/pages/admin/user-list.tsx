import { useEffect, useState, type FC } from "react";
import { useService } from "../../hooks/api";
import { getUsers } from "../../_services/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type PaginationState = {
  firstLoad: boolean;
  page: number;
  size: number;
}

const UserListPage: FC = () => {
  const navigate = useNavigate();

  const [pgn, setPgn] = useState<PaginationState>({
    firstLoad: false,
    page: 1,
    size: 10,
  })

  const usr = useService(getUsers);

  useEffect(() => {
    if (!pgn.firstLoad) {
      setPgn(prev => ({ ...prev, firstLoad: true }));
      return;
    }
    usr.request(pgn.page, pgn.size);
  }, [pgn])

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex flex-col gap-4 pt-24">
        <h1 className="text-4xl font-bold text-center">User List</h1>
        <div className="flex justify-between gap-2">
          <button
            type='button'
            className="btn btn-xs btn-secondary rounded-xl"
            onClick={() => navigate('/users/create')}
          >
            + Create User
          </button>
          <div className="flex gap-2">
            <button 
              type="button"
              className="btn btn-xs btn-outline"
              disabled={pgn.page <= 1}
              onClick={() => {
                if (pgn.page > 1) {
                  setPgn(prev => ({ ...prev, page: prev.page-1 }))
                }
              }}
            >
              Prev
            </button>
            <button 
              type="button"
              className="btn btn-xs btn-outline"
              disabled={!usr.data || usr.data.pagination.last_page <= pgn.page}
              onClick={() => {
                setPgn(prev => ({ ...prev, page: prev.page+1 }))
              }}
            >
              Next
            </button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Username</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {usr.loading && (
              <tr>
                <td colSpan={3} className="py-8 text-center">
                  <span className="loading loading-sm"/>
                </td>
              </tr>
            )}
            {(usr.data && usr.data.list.length === 0) && (
              <tr>
                <td colSpan={3} className="py-8 italic text-sm">
                  No users
                </td>
              </tr>
            )}
            {usr.data?.list.map((v, i) => (
              <tr key={`user.${i}`}>
                <td>{(pgn.page-1)*pgn.size + (i+1)}</td>
                <td>{v.username}</td>
                <td>
                  <div className="flex w-full">
                    <button
                      type='button'
                      className="btn btn-sm"
                      onClick={() => {
                        navigator.clipboard.writeText(v.first_password);
                        toast.success('Password copied')
                      }}
                    >
                      Copy Password
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserListPage;