
export interface YFinanceQuery {
    query: 'DISCOUNTED_FREE_CASH_FLOW' | 'COMPANY_INFO',
    stock: string,
}

export interface YFinanceQueryOptions {
    stock: string,
    crumb: string
}

export interface FetchYFinance {
    cookie: string,
    url: string,
    type: 'DISCOUNTED_FREE_CASH_FLOW' | 'COMPANY_INFO',
}


interface MetaData {
    symbol: string[];
    type: string[];
  }
  
  interface FinancialData {
    date: number; 
    value: number; 
  }
  
  interface FinancialEntry {
    meta: MetaData;
    timestamp: number[];
    annualFreeCashFlow?: FinancialData[];
    annualNetIncome?: FinancialData[];
    annualTotalRevenue?: FinancialData[];
  }

export type TimeSeriesData = {
    timeseries: {
      result: FinancialEntry[]; 
      error: null | string;
    };
  };

/** ----*/

export type QuoteSummaryData = {
    quoteSummary: {
      result: AssetProfileResult[];
      error: null | string;
    };
  };
  
  type AssetProfileResult = {
    assetProfile: {
      address1: string;
      city: string;
      state: string;
      zip: string;
      country: string;
      phone: string;
      website: string;
      industry: string;
      industryKey: string;
      industryDisp: string;
      sector: string;
      sectorKey: string;
      sectorDisp: string;
      longBusinessSummary: string;
      fullTimeEmployees: number;
      companyOfficers: any[]; // Puedes tiparlo mejor si conoces su estructura
      auditRisk: number;
      boardRisk: number;
      compensationRisk: number;
      shareHolderRightsRisk: number;
      overallRisk: number;
      governanceEpochDate: number;
      compensationAsOfEpochDate: number;
      irWebsite: string;
      executiveTeam: any[];
      maxAge: number;
    };
    summaryDetail: {
      maxAge: number;
      priceHint: number;
      previousClose: number;
      open: number;
      dayLow: number;
      dayHigh: number;
      regularMarketPreviousClose: number;
      regularMarketOpen: number;
      regularMarketDayLow: number;
      regularMarketDayHigh: number;
      dividendRate: number;
      dividendYield: number;
      exDividendDate: number;
      payoutRatio: number;
      fiveYearAvgDividendYield: number;
      beta: number;
      trailingPE: number;
      forwardPE: number;
      volume: number;
      regularMarketVolume: number;
      averageVolume: number;
      averageVolume10days: number;
      averageDailyVolume10Day: number;
      bid: number;
      ask: number;
      bidSize: number;
      askSize: number;
      marketCap: number;
      fiftyTwoWeekLow: number;
      fiftyTwoWeekHigh: number;
      priceToSalesTrailing12Months: number;
      fiftyDayAverage: number;
      twoHundredDayAverage: number;
      trailingAnnualDividendRate: number;
      trailingAnnualDividendYield: number;
      currency: string;
      fromCurrency: string | null;
      toCurrency: string | null;
      lastMarket: string | null;
      coinMarketCapLink: string | null;
      algorithm: string | null;
      tradeable: boolean;
    };
    defaultKeyStatistics: {
      maxAge: number;
      priceHint: number;
      enterpriseValue: number;
      forwardPE: number;
      profitMargins: number;
      floatShares: number;
      sharesOutstanding: number;
      sharesShort: number;
      sharesShortPriorMonth: number;
      sharesShortPreviousMonthDate: number;
      dateShortInterest: number;
      sharesPercentSharesOut: number;
      heldPercentInsiders: number;
      heldPercentInstitutions: number;
      shortRatio: number;
      shortPercentOfFloat: number;
      beta: number;
      impliedSharesOutstanding: number;
      category: string | null;
      bookValue: number;
      priceToBook: number;
      fundFamily: string | null;
      legalType: string | null;
      lastFiscalYearEnd: number;
      nextFiscalYearEnd: number;
      mostRecentQuarter: number;
      earningsQuarterlyGrowth: number;
      netIncomeToCommon: number;
      trailingEps: number;
      forwardEps: number;
      lastSplitFactor: string;
      lastSplitDate: number;
      enterpriseToRevenue: number;
      enterpriseToEbitda: number;
      "52WeekChange": number;
      SandP52WeekChange: number;
      lastDividendValue: number;
      lastDividendDate: number;
      latestShareClass: string | null;
      leadInvestor: string | null;
    };
    financialData: {
      maxAge: number;
      currentPrice: number;
      targetHighPrice: number;
      targetLowPrice: number;
      targetMeanPrice: number;
      targetMedianPrice: number;
      recommendationMean: number;
      recommendationKey: string;
      numberOfAnalystOpinions: number;
      totalCash: number;
      totalCashPerShare: number;
      ebitda: number;
      totalDebt: number;
      quickRatio: number;
      currentRatio: number;
      totalRevenue: number;
      debtToEquity: number;
      revenuePerShare: number;
      returnOnAssets: number;
      returnOnEquity: number;
      grossProfits: number;
      freeCashflow: number;
      operatingCashflow: number;
      earningsGrowth: number;
      revenueGrowth: number;
      grossMargins: number;
      ebitdaMargins: number;
      operatingMargins: number;
      profitMargins: number;
      financialCurrency: string;
    };
  };