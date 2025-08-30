// Mock data for testing the CashFlowChart component
export const mockFinancialData = [
  {
    year: 2020,
    data: {
      annualNetIncome: 57411000000,
      annualFreeCashFlow: 73365000000,
      annualTotalRevenue: 274515000000,
      growthRate: 0.058,
      margins: 0.267,
      freeCashFlowDividedNetIncome: 1.278
    }
  },
  {
    year: 2021,
    data: {
      annualNetIncome: 94680000000,
      annualFreeCashFlow: 92953000000,
      annualTotalRevenue: 365817000000,
      growthRate: 0.333,
      margins: 0.254,
      freeCashFlowDividedNetIncome: 0.982
    }
  },
  {
    year: 2022,
    data: {
      annualNetIncome: 99803000000,
      annualFreeCashFlow: 111443000000,
      annualTotalRevenue: 394328000000,
      growthRate: 0.078,
      margins: 0.283,
      freeCashFlowDividedNetIncome: 1.117
    }
  },
  {
    year: 2023,
    data: {
      annualNetIncome: 97000000000,
      annualFreeCashFlow: 99584000000,
      annualTotalRevenue: 383285000000,
      growthRate: -0.028,
      margins: 0.260,
      freeCashFlowDividedNetIncome: 1.027
    }
  }
];

export const mockPredictionsData = [
  {
    year: 2024,
    data: {
      annualNetIncome: 102000000000,
      annualFreeCashFlow: 104500000000,
      annualTotalRevenue: 400000000000,
      discountFactor: 0.909,
      pv: 95045000000,
      growthRate: 0.05,
      margins: 0.255,
      freeCashFlowDividedNetIncome: 1.025
    }
  },
  {
    year: 2025,
    data: {
      annualNetIncome: 107100000000,
      annualFreeCashFlow: 109725000000,
      annualTotalRevenue: 420000000000,
      discountFactor: 0.826,
      pv: 90633000000,
      growthRate: 0.05,
      margins: 0.255,
      freeCashFlowDividedNetIncome: 1.025
    }
  },
  {
    year: 2026,
    data: {
      annualNetIncome: 112455000000,
      annualFreeCashFlow: 115211000000,
      annualTotalRevenue: 441000000000,
      discountFactor: 0.751,
      pv: 86543000000,
      growthRate: 0.05,
      margins: 0.255,
      freeCashFlowDividedNetIncome: 1.025
    }
  },
  {
    year: 2027,
    data: {
      annualNetIncome: 118078000000,
      annualFreeCashFlow: 120972000000,
      annualTotalRevenue: 463050000000,
      discountFactor: 0.683,
      pv: 82624000000,
      growthRate: 0.05,
      margins: 0.255,
      freeCashFlowDividedNetIncome: 1.025
    }
  },
  {
    year: 2028,
    data: {
      annualNetIncome: 124082000000,
      annualFreeCashFlow: 127021000000,
      annualTotalRevenue: 486203000000,
      discountFactor: 0.621,
      pv: 78885000000,
      growthRate: 0.05,
      margins: 0.255,
      freeCashFlowDividedNetIncome: 1.025
    }
  }
];

export const mockFinancialModel = {
  financialData: mockFinancialData,
  predictionsData: mockPredictionsData,
  intrinsicPrice: 180.25,
  stockPrice: 225.50,
  wacc: 0.10,
  growth: 0.025
};