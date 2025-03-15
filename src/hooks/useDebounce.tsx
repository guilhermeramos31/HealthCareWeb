import { useEffect } from "react";

import useTimeout from "@/hooks/useTimeout";

interface DebounceProps {
  callback(): Promise<void> | void;
  delay: number;
  dependencies: Array<any>;
}

const useDebounce = ({
  callback,
  delay,
  dependencies,
}: DebounceProps): void => {
  const { reset, clear } = useTimeout({ callback, delay });
  useEffect(reset, [...dependencies, reset]);

  useEffect(() => {
    clear();
  }, [clear]);
};

export default useDebounce;
