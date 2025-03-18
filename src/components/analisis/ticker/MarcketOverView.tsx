import { BarChart, DollarSign, Percent } from "lucide-react"
import styles from "@/styles/analisis/ticker/sidebar/discounted-free-cash-flow/MarketOverview.module.css"

const marketData = [
  { name: "S&P 500", value: "4,185.47", change: "+0.75%" },
  { name: "Dow Jones", value: "33,875.40", change: "+0.89%" },
  { name: "Nasdaq", value: "14,026.16", change: "+0.51%" },
  { name: "Russell 2000", value: "2,266.69", change: "+1.14%" },
  { name: "Crude Oil", value: "$63.58", change: "+1.42%" },
  { name: "Gold", value: "$1,777.20", change: "-0.13%" },
  { name: "10-Yr Bond", value: "1.571%", change: "+0.9 bps" },
]

export default function MarketOverview() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Resumen del Mercado</h2>
        <div className={styles.itemList}>
          {marketData.map((item, index) => (
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

