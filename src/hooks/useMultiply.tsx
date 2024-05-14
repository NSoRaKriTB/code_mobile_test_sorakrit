import { useCallback } from "react";

export const useMultiplay = (value: number) => {
  return useCallback(() => {
    console.log('useCallback')
    return value * 10;
  }, [value]);
}