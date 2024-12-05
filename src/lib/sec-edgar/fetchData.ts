export async function fetchCompanyTickersExchange(){
    try {
        const response = await fetch('https://www.sec.gov/files/company_tickers_exchange.json');

        if (!response.ok) {
            throw new Error('Request no ok');
        }

        const result: string = await response.text();
        const dataPreviusValidate = JSON.parse(result);
    } catch (err) {
        throw new Error(String(err));
    }
}