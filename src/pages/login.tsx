import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { type LoginRequest } from "../_services/auth";
import { useAuthContext } from "../context/auth";

const LoginPage: FC = () => {
  const auth = useAuthContext();

  const [userType, setUserType] = useState<string>('ADMIN');
  const [showPassword, setShowPassword] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<LoginRequest>({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = (data: LoginRequest) => {
    if (userType === 'ADMIN') {
      auth.loginAdmin(data);
    } else if (userType === 'USER') {
      auth.loginUser(data);
    }
  }

  useEffect(() => {
    setValue('username', '');
    setValue('password', '');
  }, [userType])

  return (
    <div className="w-screen h-screen flex justify-center py-24">
      <div>
        <div className="grid grid-cols-2 tabs tabs-border">
          <button
            type='button'
            className={`tab ${userType === 'USER' ? 'tab-active' : ''}`}
            onClick={() => setUserType('USER')}
          >
            User
          </button>
          <button
            type='button'
            className={`tab ${userType === 'ADMIN' ? 'tab-active' : ''}`}
            onClick={() => setUserType('ADMIN')}
          >
            Admin
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, (err) => console.error('form error: ', err))}
          className="mt-8"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="login.username" className="text-sm font-bold text-neutral-600">Username</label>
            <input 
              type='text'
              className="input input-bordered input-sm"
              id='login.username'
              placeholder={userType === 'USER' ? 'Ask Admin for username' : 'Username'}
              {...register('username', {
                required: 'Username is required',
              })}
            />
            {errors?.username && <p className="text-xs text-red-500">{errors?.username?.message}</p>}
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="login.password" className="text-sm font-bold text-neutral-600">Password</label>
            <div className="flex justify-between input input-sm p-0">
              <input 
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className="input input-sm outline-hidden"
                id='login.password'
                placeholder={userType === 'USER' ? 'Ask Admin for password' : '*********'}
                {...register('password', {
                  required: 'Password is required',
                })}
              />
              <button
                type='button'
                className="btn btn-xs btn-ghost"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>

            </div>
            {errors?.password && <p className="text-xs text-red-500">{errors?.password?.message}</p>}
          </div>

          <div className="mt-4">
            <button
              type='submit'
              disabled={auth.loggingIn}
              className="btn btn-sm btn-success w-full flex gap-1 items-center"
            >
              {auth.loggingIn && <span className="loading loading-sm"/>}
              <span>Log In</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;