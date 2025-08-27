import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export type ServiceFunc<TArgs extends any[], TData> = (...args: TArgs) => Promise<TData>;

export type UseServiceOptions<TData> = {
  resolve?: (data: TData) => void,
  reject?: (err: unknown) => void,
}

export type UseServiceReturn<TArgs extends any[], TData> = {
  loading: boolean;
  data: TData|undefined;
  error: unknown;
  hasRequested: boolean;
  call: (...args: TArgs) => Promise<TData>;
  request: (...args: TArgs) => Promise<void>;
}

export const useService = <TArgs extends any[], TData>(
  fn: ServiceFunc<TArgs, TData>,
  opts?: UseServiceOptions<TData>,
): UseServiceReturn<TArgs, TData> => {
  const [loading, setLoading] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [data, setData] = useState<TData|undefined>();
  const [error, setError] = useState<unknown>();

  const call = useCallback(async(...args: TArgs): Promise<TData> => {
    setHasRequested(true);
    setLoading(true);
    setData(undefined);
    setError(undefined);

    try {
      const v = await fn(...args);
      setData(v);
      setLoading(false);
      return v;
    } catch(e) {
      setError(e);
      setLoading(false);
      throw e;
    }
  }, [setLoading, setData, setError])

  const request = useCallback(async(...args: TArgs): Promise<void> => {
    try {
      const v = await call(...args);
      opts?.resolve?.(v);
    } catch(e) {
      if (opts?.reject) {
        opts.reject(e);
      } else {
        toast.error((e as any)?.message ?? 'Unknown error');
      }
    }
  }, [call])

  return {
    loading,
    error,
    hasRequested,
    data,
    call,
    request,
  }
}