import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type DataContextType = {
  selectedChain: string;
  setSelectedChain: Dispatch<SetStateAction<string>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [selectedChain, setSelectedChain] = useState("ETH");

  return (
    <DataContext.Provider value={{ selectedChain, setSelectedChain }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
