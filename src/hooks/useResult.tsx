import { useWithResult } from "@/hooks/useWithResult";
import { Result } from "@/utils/result";
import { useEffect, useMemo, useState } from "react";

type UseExecuteResult<T, K> = {
  result: Result<T>;
  func: K;
};

/**
 * 非同期処理の結果をResultとして表現し、宣言的に扱えるようにする。
 */
export const useResult = <Params extends unknown[], Return>(
  callback: (...params: Params) => Promise<Return>,
  ...params: Params
): Result<Return> => {
  const [result, setResult] = useState<Result<Return>>(Result.Loading);
  const func = useWithResult(callback);

  // paramsが空だった場合にuseEffectが無限に呼ばれるのを防ぐ
  const constEmpty = useMemo(() => {
    return [];
  }, []);
  const innerParams = useMemo(() => {
    return params.length === 0 ? (constEmpty as unknown as Params) : params;
  }, [constEmpty, params]);

  useEffect(() => {
    (async () => {
      const r = await func(...innerParams);
      setResult(r);
    })();
  }, [func, innerParams]);

  return result;
};
