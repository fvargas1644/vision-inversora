'use server'

import { FetchCompanyTickersExchangeResponse } from "@/lib/definitions";

export async function fetchCompanyTickersExchange(): Promise<FetchCompanyTickersExchangeResponse> {
    try {
        const response = await fetch('https://www.sec.gov/files/company_tickers_exchange.json');

        if (!response.ok) {
            throw new Error('Request no ok');
        }

        const result: string = await response.text();
        const resultJson: FetchCompanyTickersExchangeResponse = JSON.parse(result);

        return resultJson;

    } catch (err) {
        throw new Error(String(err));
    }
}

export async function fetchCompanyConcepts() {
    try {
        const response = await fetch('https://data.sec.gov/api/xbrl/companyfacts/CIK0001633917.json');

        if (!response.ok) {
            throw new Error('Request no ok');
        }

        const result: string = await response.text();
        const resultJson: FetchCompanyTickersExchangeResponse = JSON.parse(result);

        return resultJson;

    } catch (err) {
        throw new Error(String(err));
    }
} 