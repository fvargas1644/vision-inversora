'use client'

import { getCookie } from '@/lib/yfinance-js/getData';
import { createContext, useContext, useState } from 'react';

const YFinanceContext = createContext({});

export const YFinanceProvider = ({ children } : {children: React.ReactNode}) => {
  const [YFinanceData, setYFinanceData] = useState({
    cookie: getCookie()
  });

  return (
    <YFinanceContext.Provider value={{ YFinanceData, setYFinanceData }}>
      {children}
    </YFinanceContext.Provider>
  );
};

export const useYFinanceContext = () => useContext(YFinanceContext);

