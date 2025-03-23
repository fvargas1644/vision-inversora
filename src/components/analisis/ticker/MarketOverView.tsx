'use client'

import { BarChart, DollarSign, Percent } from "lucide-react"
import styles from "@/styles/analisis/ticker/sidebar/discounted-free-cash-flow/MarketOverview.module.css"
import { useEffect, useState } from "react"
import { marketData } from "@/lib/utilsServer";

export default function MarketOverview() {

  const [summaryMarket, setSummaryMarket] = useState<{ value: string; change: string; name: string; }[]>([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      setSummaryMarket(await marketData());
    };
  
    // Llamar la función inmediatamente al montar el componente
    fetchMarketData();
  
    // Luego, establecer el intervalo para llamarla cada 5 segundos
    const interval = setInterval(fetchMarketData, 5000);
  
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Resumen del Mercado</h2>
        <div className={styles.itemList}>
          {summaryMarket.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemInfo}>
                {index < 4 ? (
                  <BarChart className={`${styles.icon} ${styles.iconBlue}`} />
                ) : index === 4 || index === 5 ? (
                  <DollarSign className={`${styles.icon} ${styles.iconGreen}`} />
                ) : (
                  <Percent className={`${styles.icon} ${styles.iconPurple}`} />
                )}
                <div className={styles.itemName}>{item.name}</div>
              </div>
              <div className={styles.itemValues}>
                <div className={styles.itemValue}>{item.value}</div>
                <div
                  className={`${styles.itemChange} ${
                    item.change.startsWith("+") ? styles.changePositive : styles.changeNegative
                  }`}
                >
                  {item.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

