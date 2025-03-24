'use server';

import { secEdgarCompanyTickers,SecEdgarFinancialData } from "@/lib/types/secEdgar";
import { RequestError } from "@/lib/Error/Error";


async function fetchJson<R>({url, type} : {url: string, type: 'TICKERS_EXCHAGE' | 'COMPANY_CONCEPTS'}): Promise<R> {
    try {
        const response = await fetch(url,{ cache: 'no-store' });

        if (!response.ok) {
            throw new RequestError(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        const {state : stateValidate, data} = VALIDATE_FETCH_SECEDGAR[type](result);
            
        if(!stateValidate) {
            throw new RequestError('No data found');
        } else { 
            return data;
        } 
    } catch (err) {
        throw new Error(`Fetch error in ${url}: ${err instanceof Error ? err.message : String(err)}`);
    }
}

export async function fetchSecEdgarCompanyTickers(): Promise<secEdgarCompanyTickers > {
    //return fetchJson<secEdgarCompanyTickers>({url : 'https://www.sec.gov/files/company_tickers_exchange.json', type: 'TICKERS_EXCHAGE'});
    return {
        "fields": [
          "cik",
          "name",
          "ticker",
          "exchange"
        ],
        "data": [
          [320193, "Apple Inc.",
            "AAPL",
            "Nasdaq"
          ],
          [1045810, "NVIDIA CORP",
            "NVDA",
            "Nasdaq"
          ],
          [789019, "MICROSOFT CORP",
            "MSFT",
            "Nasdaq"
          ],
          [1018724, "AMAZON COM INC",
            "AMZN",
            "Nasdaq"
          ],
          [1652044, "Alphabet Inc.",
            "GOOGL",
            "Nasdaq"
          ],
          [1326801, "Meta Platforms, Inc.",
            "META",
            "Nasdaq"
          ],
          [1067983, "BERKSHIRE HATHAWAY INC",
            "BRK-B",
            "NYSE"
          ],
          [1730168, "Broadcom Inc.",
            "AVGO",
            "Nasdaq"
          ]
        ]
    }
}

export async function fetchSecEdgarCompanyConcepts(cik : number) { // TODO: Definir el tipo de respuesta correcto
    const url = `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik.toString().padStart(10, '0')}.json`;
    return await fetchJson({url, type: 'COMPANY_CONCEPTS'});
}

const VALIDATE_FETCH_SECEDGAR = {
    TICKERS_EXCHAGE: (companyTickersExchange) => {
        const hasData = companyTickersExchange.data.length > 0
        return {
            state: hasData,
            data: companyTickersExchange
        }
    },

    COMPANY_CONCEPTS: (companyConcepts : SecEdgarFinancialData) => {
        const hasVal = companyConcepts.facts.dei.EntityCommonStockSharesOutstanding.units.shares.some(item=> item.hasOwnProperty('val'));
        const state =  (hasVal) ? true : false;

        return {
            state,
            data: companyConcepts.facts.dei.EntityCommonStockSharesOutstanding.units.shares
        }
    }
}



