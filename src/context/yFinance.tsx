'use client'

import { getCookie } from '@/lib/yfinance-js/getData';
import { createContext, useContext, useEffect, useState } from 'react';

const YFinanceContext = createContext({});

export const YFinanceProvider = ({ children } : {children: React.ReactNode}) => {
  const [YFinanceData, setYFinanceData] = useState({
    cookie: ''
  });

  useEffect(() => {
    const update = async () => {
        const res = await getCookie()
        if(res){
            setYFinanceData({cookie: res})
        }
    }
    update()
  }, [])
  

  return (
    <YFinanceContext.Provider value={{ YFinanceData, setYFinanceData }}>
      {children}
    </YFinanceContext.Provider>
  );
};

export const useYFinanceContext = () => useContext(YFinanceContext);

