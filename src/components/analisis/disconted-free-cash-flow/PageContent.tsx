
'use client'

import styles from '@/styles/analisis/discounted-free-cash-flow/PageContent.module.css'
import { useContext } from 'react';
import { DiscontedFreeCashFlowProviderContext } from '@/context/DiscountedFreeCashFlowContext';
import Sidebar from '../SideBar';
import Title from './Title';
import Metrics from './Metrics';
import FinancialData from './FinancialData';
import MarcketOverView from './MarcketOverView';


export default function PageContent({ stock }: { stock: string }) {

    const { financialData } = useContext(DiscontedFreeCashFlowProviderContext);

    if (financialData) {
        return (
            <main className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.sidebar}>
                        <Sidebar />
                    </div>
                    <div className={styles.newsSection}>
                        <main className={styles.mainContent}>
                            <Title />
                            <Metrics />
                            <FinancialData previousYearsData={financialData.previousYearsData} />
                        </main>
                    </div>
                    <div className={styles.marketOverview}>
                        <div>
                            <MarcketOverView />
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}