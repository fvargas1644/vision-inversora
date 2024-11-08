import styles from '@/styles/analisis/discounted-free-cash-flow/header.module.css'

interface HeadInterface{
    stockName: string,
    stockPrice: number,
    stockintrinsicPrice: number
}

export function Header({stockName, stockPrice, stockintrinsicPrice} : HeadInterface){
    return (
        <div className={styles.vi_container}>
            <header className={styles.vi_header}>
                <div>   
                    <h2>{stockName}</h2>
                    <p>Precio Actual Acción</p>
                    <h3>{stockPrice}</h3>
                </div>
                <div>   
                    <h1>{stockintrinsicPrice}</h1>
                    <p>Valor intrínseco</p>
                </div>
                <div>   
                    <p>Disconted Free <br /> Cash Flow</p>
                </div>
            </header>
        </div>
    )
}   