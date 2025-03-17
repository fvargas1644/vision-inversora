export default function Header({ticker, company, stockPrice} : {ticker: string, company: string, stockPrice: number}){
    return (
        <header className="card">
            <h1 >{company} ({ticker})</h1>
            <h2>{stockPrice}</h2>
        </header>
    )
}