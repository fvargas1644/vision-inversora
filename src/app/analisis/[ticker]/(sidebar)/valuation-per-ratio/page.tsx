import { fetchCompanyConcepts } from "@/lib/sec-edgar/fetchData";


export default async function Page({ params }: { params: { ticker: string } }) {
    const data = await fetchCompanyConcepts();
    console.log(data)
    return (
       <h1>Per</h1>
    )
}