'use client'

import { useEffect, useState } from "react"

export default function TestClient() {
    const [data, setData] = useState<string>("")

    useEffect(() => {
        const fetchA =async () => {
            let respose = await fetch("https://www.sec.gov/files/company_tickers_exchange.json")
            respose = await respose.json()
            setData(String(respose.data[0][2])) 
        }  

        fetchA()
    }, [])

    return (
        <div>
            {data}
        </div>
    )
}

