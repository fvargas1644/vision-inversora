import SelectionBar from "@/components/analisis/SelectionBar";
import AnalysisProvider from "@/context/AnalysisContext";
import { FetchCompanyTickersExchangeResponse } from "@/lib/sec-edgar/definitions";
import { fetchCompanyTickersExchange } from "@/lib/sec-edgar/fetchData";

async function findCompany(stock : string) {
    const fechCompany : FetchCompanyTickersExchangeResponse = await fetchCompanyTickersExchange(); 
    for (let item of fechCompany.data) {
        if (item[2] === stock) {
            return {
                stock,
                company: item[1]
            }
        }
    }

    return {stock: null, company: null}
}

export default async function Layout({
    children,
    params
}: Readonly<{
  children: React.ReactNode;
  params: {stock: string}
}>){

    const {stock, company} = await findCompany(params.stock);

    if(stock) {
        return (
            <AnalysisProvider stock={stock} company={company}>
                {children}
                <SelectionBar stock={stock} />
            </AnalysisProvider>
        )
    } else {
        return (
            <>
                <h1>STOCK NO ECNONTRADO</h1>
                {children}
            </>
        )
    }
   
}