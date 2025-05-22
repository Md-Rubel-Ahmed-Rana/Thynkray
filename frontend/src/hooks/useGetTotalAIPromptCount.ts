import { getLocalStorageValue } from "@/db/localStorage";
import { useEffect, useState } from "react";

const useGetTotalAIPromptCount = (userId: string): number => {
  const [totalAIPromptCount, setTotalAIPromptCount] = useState<number>(0);
  useEffect(() => {
    const totalCount = getLocalStorageValue(userId); // number or null
    if (totalCount !== null) {
      setTotalAIPromptCount(Number(totalCount));
    }
  }, [userId]);

  return totalAIPromptCount;
};

export default useGetTotalAIPromptCount;
