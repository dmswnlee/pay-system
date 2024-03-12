import { useState } from "react";

const usePromiseLoading = () => {
  const [loading, setLoading] = useState(false);

  const setLoadingState = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return { loading, setLoadingState };
};

export default usePromiseLoading;
