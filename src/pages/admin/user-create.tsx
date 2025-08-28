import type { FC } from "react";
import { useService } from "../../hooks/api";
import { createUser } from "../../_services/user";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const UserCreatePage: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string }>()

  const create = useService(createUser, {
    resolve: () => {
      toast.success('User created');
      navigate('/users');
    }
  });

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex flex-col gap-4 pt-24">
        <h1 className="text-4xl font-bold text-center">Create New User</h1>
        <form 
          className="mt-8"
          onSubmit={handleSubmit((data) => create.request(data.username))}
        >
          <label htmlFor='create-user.username' className="text-xs font-semibold text-neutral-600">Username</label>
          <input 
            type='text'
            className="input input-sm rounded-lg"
            placeholder="e.g. mike2000"
            {...register('username', {
              required: 'Required'
            })}
          />
          {errors?.username && <p className="text-xs text-red-500">{errors?.username.message}</p>}

          <button 
            className="mt-4 btn btn-sm btn-primary flex gap-1 w-full"
            disabled={create.loading}
          >
            {create.loading && <span className="loading loading-sm"/>}
            <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserCreatePage;