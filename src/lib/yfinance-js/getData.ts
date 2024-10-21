
export async function getCrumb()  {
    try {
        const response = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            'Accept-Encoding': 'gzip, deflate',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Cookie': 'A3=d=AQABBC2kFWcCEBvNIt7hPw2fpL6VDLKt8mkFEgEBAQH1FmcfZ9wv0iMA_eMAAA&S=AQAAAsvhR9OLBnjqDIJ8qldPLaQ',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        return result
    } catch (err) {
        return err
    }
}

export async function getParams() {
    //const crumb = getCrumb();
    try {
        const response = await fetch('https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/AAPL?symbol=AAPL&type=annualTaxEffectOfUnusualItems,annualTaxRateForCalcs,annualNormalizedEBITDA,annualNormalizedDilutedEPS,annualNormalizedBasicEPS,annualTotalUnusualItems,annualTotalUnusualItemsExcludingGoodwill,annualNetIncomeFromContinuingOperationNetMinorityInterest,annualReconciledDepreciation,annualReconciledCostOfRevenue,annualEBITDA,annualEBIT,annualNetInterestIncome,annualInterestExpense,annualInterestIncome,annualContinuingAndDiscontinuedDilutedEPS,annualContinuingAndDiscontinuedBasicEPS,annualNormalizedIncome,annualNetIncomeFromContinuingAndDiscontinuedOperation,annualTotalExpenses,annualRentExpenseSupplemental,annualReportedNormalizedDilutedEPS,annualReportedNormalizedBasicEPS,annualTotalOperatingIncomeAsReported,annualDividendPerShare,annualDilutedAverageShares,annualBasicAverageShares,annualDilutedEPS,annualDilutedEPSOtherGainsLosses,annualTaxLossCarryforwardDilutedEPS,annualDilutedAccountingChange,annualDilutedExtraordinary,annualDilutedDiscontinuousOperations,annualDilutedContinuousOperations,annualBasicEPS,annualBasicEPSOtherGainsLosses,annualTaxLossCarryforwardBasicEPS,annualBasicAccountingChange,annualBasicExtraordinary,annualBasicDiscontinuousOperations,annualBasicContinuousOperations,annualDilutedNIAvailtoComStockholders,annualAverageDilutionEarnings,annualNetIncomeCommonStockholders,annualOtherunderPreferredStockDividend,annualPreferredStockDividends,annualNetIncome,annualMinorityInterests,annualNetIncomeIncludingNoncontrollingInterests,annualNetIncomeFromTaxLossCarryforward,annualNetIncomeExtraordinary,annualNetIncomeDiscontinuousOperations,annualNetIncomeContinuousOperations,annualEarningsFromEquityInterestNetOfTax,annualTaxProvision,annualPretaxIncome,annualOtherIncomeExpense,annualOtherNonOperatingIncomeExpenses,annualSpecialIncomeCharges,annualGainOnSaleOfPPE,annualGainOnSaleOfBusiness,annualOtherSpecialCharges,annualWriteOff,annualImpairmentOfCapitalAssets,annualRestructuringAndMergernAcquisition,annualSecuritiesAmortization,annualEarningsFromEquityInterest,annualGainOnSaleOfSecurity,annualNetNonOperatingInterestIncomeExpense,annualTotalOtherFinanceCost,annualInterestExpenseNonOperating,annualInterestIncomeNonOperating,annualOperatingIncome,annualOperatingExpense,annualOtherOperatingExpenses,annualOtherTaxes,annualProvisionForDoubtfulAccounts,annualDepreciationAmortizationDepletionIncomeStatement,annualDepletionIncomeStatement,annualDepreciationAndAmortizationInIncomeStatement,annualAmortization,annualAmortizationOfIntangiblesIncomeStatement,annualDepreciationIncomeStatement,annualResearchAndDevelopment,annualSellingGeneralAndAdministration,annualSellingAndMarketingExpense,annualGeneralAndAdministrativeExpense,annualOtherGandA,annualInsuranceAndClaims,annualRentAndLandingFees,annualSalariesAndWages,annualGrossProfit,annualCostOfRevenue,annualTotalRevenue,annualExciseTaxes,annualOperatingRevenue,annualLossAdjustmentExpense,annualNetPolicyholderBenefitsAndClaims,annualPolicyholderBenefitsGross,annualPolicyholderBenefitsCeded,annualOccupancyAndEquipment,annualProfessionalExpenseAndContractServicesExpense,annualOtherNonInterestExpense&period1=1483142400&period2=1729555200&crumb=Ez2YEJjvRye', {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            'Accept-Encoding': 'gzip, deflate',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Cookie': 'A3=d=AQABBC2kFWcCEBvNIt7hPw2fpL6VDLKt8mkFEgEBAQH1FmcfZ9wv0iMA_eMAAA&S=AQAAAsvhR9OLBnjqDIJ8qldPLaQ',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        return result
    } catch (err) {
        return err
    }
}