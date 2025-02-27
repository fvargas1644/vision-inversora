export type SecEdgarCompanyTicker = [
    number,
    string,
    string,
    string,
]

export interface SecEdgarFetchCompanyTickersExchangeResponse {
    fields: string[];
    data: SecEdgarCompanyTicker[];
}


