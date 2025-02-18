import SelectionBar from "@/components/analisis/SelectionBar";
import AnalysisProvider from "@/context/AnalysisContext";
import { findCompany } from "@/lib/utilsServer";



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