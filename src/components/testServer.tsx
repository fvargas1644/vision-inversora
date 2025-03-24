'use server'

export default async function TestServer() {
    const data = await fetchData();

    return (
        <div>
            {String(data.data[0][1])}
        </div>
    )
}

export async function fetchData(){
    const data = await fetch("https://www.sec.gov/files/company_tickers_exchange.json")
    return data.json()
}