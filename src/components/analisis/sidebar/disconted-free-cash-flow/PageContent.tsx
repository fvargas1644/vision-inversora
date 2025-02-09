'use client'

import { useContext } from 'react';
import { DiscontedFreeCashFlowContext } from '@/context/DiscountedFreeCashFlowContext';
import Title from './Title';
import Metrics from './Metrics';
import FinancialData from './FinancialData';
import { AnalysisContext } from '@/context/AnalysisContext';


export default function PageContent() {

    const { financialData } = useContext(DiscontedFreeCashFlowContext);
    const { stock, company } = useContext(AnalysisContext);

    if (financialData) {
        return (
            <>
                <Title stock={stock} company={company} />
                <Metrics currentPrice={financialData.stockPrice} intrinsicValue={financialData.intrinsicPrice} />
                <FinancialData previousYearsData={financialData.financialData} futureYearsData={financialData.predictionsData} />
            </>
        )
    }
}