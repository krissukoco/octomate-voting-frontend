import { useEffect, type FC } from "react";
import { useService } from "../../hooks/api";
import { getVoteSummary } from "../../_services/vote";

const AdminVotePage: FC = () => {
  const summary = useService(getVoteSummary);

  useEffect(() => {
    summary.request();
  }, [])

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="py-24">
        <h1 className="text-4xl font-bold text-center">Vote Result</h1>
        {summary.data ? (
          <div className="text-center mt-8">
            <h4 className="text-sm ">Total Votes: {summary.data.count}</h4>
            <h4 className="text-sm ">Total Choices: {summary.data.list.length}</h4>
            <h5 className={`text-sm font-bold ${summary.data.winner ? 'text-green-600' : ''}`}>Winner: {summary.data.winner || '-'}</h5>
            <div className="flex flex-col gap-2.5 mt-4">
              {summary.data.list.map((vt, i) => (
                <div key={`vote.${i}`} className={`p-4 min-w-[400px] rounded-lg border hover:shadow-md transition-all duration-300 ${vt.name === summary.data?.winner ? 'border-green-500 bg-green-100' : 'border-neutral-200'}`}>
                  <div className="flex justify-between">
                    <p className={`text-sm font-bold ${vt.name === summary.data?.winner ? 'text-green-700' : 'text-neutral-600'}`}>{vt.name}</p>
                    <p className={`text-xs ${vt.name === summary.data?.winner ? 'text-green-700' : 'text-neutral-600'}`}>{`${vt.count} (${vt.percentage.toFixed(2)}%)`}</p>
                  </div>
                  <progress className={`progress ${vt.name === summary.data?.winner ? 'progress-success' : 'progress-warning'}`} value={vt.percentage} max={100}/>
                </div>
              ))}
            </div>
            {summary.data.list.length === 0 && (
              <div className="py-8 flex items-center justify-center">
                <span className="italic text-sm">No votes yet...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="py-16 flex justify-center items-center">
            <span className="loading loading-lg"/>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminVotePage;