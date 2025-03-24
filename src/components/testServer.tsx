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
    const res = await fetch("https://www.sec.gov/files/company_tickers_exchange.json");
    const data = await res.json();
    console.error("Viendo los logs en NEXT")
    return data;
}