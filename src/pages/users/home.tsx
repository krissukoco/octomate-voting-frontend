import { useEffect, useState, type FC } from "react";
import { useAuthContext } from "../../context/auth";
import { useService } from "../../hooks/api";
import { getCurrentVote, getOptions, vote } from "../../_services/vote";

const UserHomePage: FC = () => {
  const auth = useAuthContext();

  const [choosing, setChoosing] = useState(true);
  const [choiceIndex, setChoiceIndex] = useState(-1);
  const [custom, setCustom] = useState('');

  const curr = useService(getCurrentVote, {
    resolve: (v) => {
      if (v.currentVote) {
        setChoosing(false);
      }
    },
  });
  const opts = useService(getOptions);
  const createVote = useService(vote, {
    resolve: () => {
      curr.request();
      opts.request();
    },
  });

  useEffect(() => {
    curr.request();
    opts.request();
  }, [])

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="">
        <section className="flex flex-col gap-1 items-center">
          <h1 className="text-4xl font-bold text-neutral-600">Hi, {auth.actor?.username}</h1>
          <h4 className="text-sm">Welcome to Voting App</h4>
          <h4 className="text-lg font-bold">Please vote for our holiday destination!</h4>
          <button
            type='button'
            className="btn btn-sm btn-ghost text-red-500"
            onClick={() => auth.logout()}
          >
            Log Out
          </button>
        </section>

        <section className="mt-8">
          {(!curr.data || !opts.data) ? (
            <div className="py-8 flex items-center justify-center">
              <span className="loading loading-lg"/>
            </div>
          ) : choosing ? (
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col w-full gap-1">
                <p className="text-xs font-bold text-neutral-600">Choose below:</p>
                <div className="flex flex-col gap-1 w-full">
                  {opts.data.list.map((op, i) => (
                    <button
                      key={`choice.${i}`}
                      className={`btn btn-sm bg-blue-100 ${choiceIndex === i ? 'border border-blue-500' : ''}`}
                      onClick={() => setChoiceIndex(i)}
                    >
                      <span>{op}</span>
                    </button>
                  ))}
                </div>
                {opts.data.list.length === 0 && (
                  <div className="py-8 flex justify-center items-center text-sm italic">No choice available</div>
                )}

              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor='choice.custom' className="text-xs font-bold text-neutral-600">Or write customly here:</label>
                <input 
                  type="text"
                  className={`input input-sm w-full outline-hidden ${choiceIndex < 0 ? 'border border-blue-500' : ''}`}
                  value={custom}
                  onFocus={() => {
                    setChoiceIndex(-1);
                  }}
                  onChange={(ev) => {
                    const val = ev?.target?.value || '';
                    setCustom(val);
                  }}
                />
              </div>

              <button
                type='button'
                disabled={createVote.loading}
                className="btn btn-sm w-full bg-green-500 rounded-xl flex gap-1 items-center"
                onClick={() => {
                  if (choiceIndex >= 0) {
                    const v = opts?.data?.list[choiceIndex];
                    if (v) {
                      createVote.request({ name: v })
                    }
                  } else if (custom) {
                    createVote.request({ name: custom })
                  }
                }}
              >
                {createVote.loading && (
                  <span className="loading loading-sm"/>
                )}
                <span>Submit</span>
              </button>

            </div>
          ) : (
            <div
              className="bg-green-500 text-white p-8 rounded-lg flex flex-col gap-4 justify-center items-center"
            >
              <p>You've chosen {curr.data?.currentVote?.name}</p>
              <button
                type='button'
                className="btn btn-sm btn-outline w-full"
                onClick={() => {
                  setChoosing(true);
                  if (!opts.data || !curr.data?.currentVote) return;
                  const idx = opts.data.list.findIndex(v => v === curr.data!.currentVote!.name);
                  if (idx >= 0) {
                    setChoiceIndex(idx);
                    setCustom('');
                  } else {
                    setCustom(curr.data!.currentVote.name);
                  }
                }}
              >
                Change your Choice
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default UserHomePage;