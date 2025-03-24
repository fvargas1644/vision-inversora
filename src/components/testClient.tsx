'use client'

import { useEffect, useState } from "react"
import { fetchData } from "@/components/testServer"

export default function TestClient() {
    const [data, setData] = useState<string>("")

    useEffect(() => {
        const fetch =async () => {
            const respose = await fetchData()
            setData(String(respose.data[0][2])) 
        }  

        fetch()
    }, [])

    return (
        <div>
            {data}
        </div>
    )
}

