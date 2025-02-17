import { fetchCompanyConcepts } from "@/lib/sec-edgar/fetchData";


export default async function Page({ params }: { params: { ticker: string } }) {
    const data = await fetchCompanyConcepts();
    return (
       <h1>Per</h1>
    )
}