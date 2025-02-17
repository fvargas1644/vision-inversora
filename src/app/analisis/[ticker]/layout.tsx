import SelectionBar from "@/components/analisis/SelectionBar";
import AnalysisProvider from "@/context/AnalysisContext";
import { FetchCompanyTickersExchangeResponse } from "@/lib/definitions";
import { fetchCompanyTickersExchange } from "@/lib/sec-edgar/fetchData";

async function findCompany(ticker: string) {
    const fechCompany: FetchCompanyTickersExchangeResponse = await fetchCompanyTickersExchange();
    for (let item of fechCompany.data) {
        if (item[2] === ticker) {
            return {
                cik: item[0],
                ticker,
                company: item[1]
            }
        }
    }
    return { ticker: null, company: null }
}

export default async function Layout({ children, params }: Readonly<{ children: React.ReactNode; params: { ticker: string } }>) {

    const { ticker, company, cik } = await findCompany(params.ticker);

    if (ticker) {
        return (
            <AnalysisProvider ticker={ticker} company={company} cik={cik}>
                {children}
                <SelectionBar ticker={ticker} />
            </AnalysisProvider>
        )
    } else {
        return (
            <>
                <h1>STOCK NO ENCONTRADO</h1>
                {children}
            </>
        )
    }
}