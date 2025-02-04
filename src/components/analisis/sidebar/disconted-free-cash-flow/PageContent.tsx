'use client'

import { useContext } from 'react';
import { DiscontedFreeCashFlowProviderContext } from '@/context/DiscountedFreeCashFlowContext';
import Title from './Title';
import Metrics from './Metrics';
import FinancialData from './FinancialData';
import { AnalysisContext } from '@/context/AnalysisContext';


export default function PageContent() {

    const { financialData } = useContext(DiscontedFreeCashFlowProviderContext);
    const { stock, company } = useContext(AnalysisContext);

    if (financialData) {
        return (
            <>
                <Title stock={stock} company={company} />
                <Metrics currentPrice={financialData.stockPrice} intrinsicValue={financialData.intrinsicPrice} />
                <FinancialData previousYearsData={financialData.previousYearsData} futureYearsData={financialData.futureYearsData} />
            </>
        )
    }
}