'use client'

import { useContext } from 'react';
import { DiscontedFreeCashFlowContext } from '@/context/DiscountedFreeCashFlowContext';
import Title from './Title';
import Metrics from './Metrics';
import FinancialDataTables from './FinancialDataTables';
import { AnalysisContext } from '@/context/AnalysisContext';


export default function PageContent() {

    const { financialModel } = useContext(DiscontedFreeCashFlowContext);
    const { ticker, company } = useContext(AnalysisContext);

    if (financialModel) {
        return (
            <>
                <Title ticker={ticker} company={company} />
                <Metrics currentPrice={financialModel.stockPrice} intrinsicValue={financialModel.intrinsicPrice} />
                <FinancialDataTables financialData={financialModel.financialData} predictionsData={financialModel.predictionsData} />
            </>
        )
    }
}