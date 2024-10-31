interface HeadInterface{
    stockName: string,
    stockPrice: number,
    stockintrinsicPrice: number
}

export function Header({stockName, stockPrice, stockintrinsicPrice} : HeadInterface){
    return (
        <section>
            <div>   
                <p>Valor intrínseco</p>
                <h2>{stockintrinsicPrice}</h2>
            </div>
            <div>   
                <p>Acción Compañia</p>
                <h2>{stockName}</h2>
            </div>
            <div>   
                <p>Valor Actual Acción</p>
                <h2>{stockPrice}</h2>
            </div>
        </section>
    )
}   