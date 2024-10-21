
const userAgent = 'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36'

export async function getCrumb()  {
    const cookie= await getCookie()
    try {
        const response = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
          method: 'GET',
          headers: {
            'User-Agent': userAgent,
            'Accept-Encoding': 'gzip, deflate',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Cookie': cookie,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        return result
    } catch (error) {
        return error
    }
}

export async function getParams() {
    const cookie= await getCookie()

    //const crumb = getCrumb();
    try {
        const response = await fetch('https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/AAPL?symbol=AAPL&type=annualTaxEffectOfUnusualItems,annualTaxRateForCalcs,annualNormalizedEBITDA,annualNormalizedDilutedEPS,annualNormalizedBasicEPS,annualTotalUnusualItems,annualTotalUnusualItemsExcludingGoodwill,annualNetIncomeFromContinuingOperationNetMinorityInterest,annualReconciledDepreciation,annualReconciledCostOfRevenue,annualEBITDA,annualEBIT,annualNetInterestIncome,annualInterestExpense,annualInterestIncome,annualContinuingAndDiscontinuedDilutedEPS,annualContinuingAndDiscontinuedBasicEPS,annualNormalizedIncome,annualNetIncomeFromContinuingAndDiscontinuedOperation,annualTotalExpenses,annualRentExpenseSupplemental,annualReportedNormalizedDilutedEPS,annualReportedNormalizedBasicEPS,annualTotalOperatingIncomeAsReported,annualDividendPerShare,annualDilutedAverageShares,annualBasicAverageShares,annualDilutedEPS,annualDilutedEPSOtherGainsLosses,annualTaxLossCarryforwardDilutedEPS,annualDilutedAccountingChange,annualDilutedExtraordinary,annualDilutedDiscontinuousOperations,annualDilutedContinuousOperations,annualBasicEPS,annualBasicEPSOtherGainsLosses,annualTaxLossCarryforwardBasicEPS,annualBasicAccountingChange,annualBasicExtraordinary,annualBasicDiscontinuousOperations,annualBasicContinuousOperations,annualDilutedNIAvailtoComStockholders,annualAverageDilutionEarnings,annualNetIncomeCommonStockholders,annualOtherunderPreferredStockDividend,annualPreferredStockDividends,annualNetIncome,annualMinorityInterests,annualNetIncomeIncludingNoncontrollingInterests,annualNetIncomeFromTaxLossCarryforward,annualNetIncomeExtraordinary,annualNetIncomeDiscontinuousOperations,annualNetIncomeContinuousOperations,annualEarningsFromEquityInterestNetOfTax,annualTaxProvision,annualPretaxIncome,annualOtherIncomeExpense,annualOtherNonOperatingIncomeExpenses,annualSpecialIncomeCharges,annualGainOnSaleOfPPE,annualGainOnSaleOfBusiness,annualOtherSpecialCharges,annualWriteOff,annualImpairmentOfCapitalAssets,annualRestructuringAndMergernAcquisition,annualSecuritiesAmortization,annualEarningsFromEquityInterest,annualGainOnSaleOfSecurity,annualNetNonOperatingInterestIncomeExpense,annualTotalOtherFinanceCost,annualInterestExpenseNonOperating,annualInterestIncomeNonOperating,annualOperatingIncome,annualOperatingExpense,annualOtherOperatingExpenses,annualOtherTaxes,annualProvisionForDoubtfulAccounts,annualDepreciationAmortizationDepletionIncomeStatement,annualDepletionIncomeStatement,annualDepreciationAndAmortizationInIncomeStatement,annualAmortization,annualAmortizationOfIntangiblesIncomeStatement,annualDepreciationIncomeStatement,annualResearchAndDevelopment,annualSellingGeneralAndAdministration,annualSellingAndMarketingExpense,annualGeneralAndAdministrativeExpense,annualOtherGandA,annualInsuranceAndClaims,annualRentAndLandingFees,annualSalariesAndWages,annualGrossProfit,annualCostOfRevenue,annualTotalRevenue,annualExciseTaxes,annualOperatingRevenue,annualLossAdjustmentExpense,annualNetPolicyholderBenefitsAndClaims,annualPolicyholderBenefitsGross,annualPolicyholderBenefitsCeded,annualOccupancyAndEquipment,annualProfessionalExpenseAndContractServicesExpense,annualOtherNonInterestExpense&period1=1483142400&period2=1729555200&crumb=Ez2YEJjvRye', {
          method: 'GET',
          headers: {
            'User-Agent': userAgent,
            'Accept-Encoding': 'gzip, deflate',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Cookie': cookie,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        return result
    } catch (error) {
        return error
    }
}

export async function getCookie() {
  try {
    const response = await fetch('https://fc.yahoo.com', {
          method: 'GET',
          headers: {
            'User-Agent': userAgent,
          },
    });
    const setCookie = response.headers.get('set-cookie')

    if (setCookie) {
      // Dividir el string en ';' y tomar el primer valor
      const cookie = setCookie.split(';')[0].trim();
      return cookie; // Retorna el primer valor del Set-Cookie
    }

    return null;
  } catch (error) {
    console.error('Error fetching cookie:', error);
    return null;
  }
}