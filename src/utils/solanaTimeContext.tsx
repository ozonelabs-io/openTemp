import React, { createContext, useContext, useEffect, useState } from "react";
import { useUmi } from "./useUmi";
import { connection } from "./walletProvider";

type SolanaTimeContextType = {
  solanaTime: number;
};

const SolanaTimeContext = createContext<SolanaTimeContextType>({
  solanaTime: 0,
});

export const useSolanaTime = () => useContext(SolanaTimeContext).solanaTime;

export const SolanaTimeContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [solanaTime, setSolanaTime] = useState<number>(0);
  useEffect(() => {
    const fetchSolanaTime = async () => {
      const slot = await connection.getSlot();
      let time = await connection.getBlockTime(slot);
      if (!time) time = 0;
      setSolanaTime(time);
    };

    fetchSolanaTime();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch when umi.identity.publicKey changes

  return (
    <SolanaTimeContext.Provider value={{ solanaTime }}>
      {children}
    </SolanaTimeContext.Provider>
  );
};
