import styles from '@/styles/analisis/discounted-free-cash-flow/header.module.css'

interface HeaderInterface{
    stockName: string,
    stockPrice: number,
    stockintrinsicPrice: number,
    children: React.ReactNode
}

export function Header({children, stockName, stockPrice, stockintrinsicPrice} : HeaderInterface){
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
                    <p>Valor Intrínseco</p>
                </div>
                <div>   
                    <p>{children}</p>
                </div>
            </header>
        </div>
    )
}   