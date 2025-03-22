import AnalysisProvider from "@/context/AnalysisContext";
import { findCompany } from "@/lib/utilsServer";
import { notFound } from "next/navigation";



export default async function Layout({ children, params }: Readonly<{ children: React.ReactNode; params: { ticker: string } }>) {

    const { ticker, company, cik } = await findCompany(params.ticker);

    if (ticker) {
        return (
            <AnalysisProvider ticker={ticker} company={company} cik={cik}>
                {children}
            </AnalysisProvider>
        )
    } else {
        notFound()
    }
}