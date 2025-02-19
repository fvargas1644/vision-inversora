'use server';

import { FetchCompanyTickersExchangeResponse } from "@/lib/definitions";


async function fetchJson<R>(url: string): Promise<R> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'vision-inversora/1.0', // SEC recomienda incluir un User-Agent personalizado
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json(); // Más eficiente que response.text() + JSON.parse()
    } catch (err) {
        throw new Error(`Fetch error in ${url}: ${err instanceof Error ? err.message : String(err)}`);
    }
}

export async function fetchCompanyTickersExchange(): Promise<FetchCompanyTickersExchangeResponse> {
    return fetchJson<FetchCompanyTickersExchangeResponse>('https://www.sec.gov/files/company_tickers_exchange.json');
}

export async function fetchCompanyConcepts(cik : number): Promise<any> { // TODO: Definir el tipo de respuesta correcto
    const url = `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik.toString().padStart(10, '0')}.json`
    return await fetchJson<any>(url);
}



