'use client'

import { useEffect, useState } from "react"
import { fetchData } from "./testServer"

export default function TestClient() {
    const [data, setData] = useState<string>("")

    useEffect(() => {
        const fetch =async () => {
            const respose = await fetchData()
            setData(respose.data[0][2]) 
        }  

        fetch()
    }, [])

    return (
        <div>
            {data}
        </div>
    )
}
