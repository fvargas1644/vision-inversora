'use server'

export async function fetchCompanyTickersExchange(){
    try {
        const response = await fetch('https://www.sec.gov/files/company_tickers_exchange.json');

        if (!response.ok) {
            throw new Error('Request no ok');
        }

        const result: string = await response.text();
        const resultJson = JSON.parse(result);

        return resultJson;

    } catch (err) {
        throw new Error(String(err));
    }
}