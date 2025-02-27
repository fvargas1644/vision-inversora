export type CompanyTicker = [
    number,
    string,
    string,
    string,
]

export interface FetchCompanyTickersExchangeResponse {
    fields: string[];
    data: CompanyTicker[];
}


