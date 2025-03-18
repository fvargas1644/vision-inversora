import Link from "next/link"
import { Calculator, DollarSign, BarChart2, PieChart, TrendingUp, Scale } from "lucide-react"
import styles from "./OptionCards.module.css"

const options = [
  {
    title: "Know the intrinsic value of the share",
    description: "Calculate the fair value of a stock using discounted cash flow method",
    icon: DollarSign,
    href: "/tools/intrinsic-value",
  },
  {
    title: "Calculate portfolio",
    description: "Analyze and optimize your investment portfolio for better returns",
    icon: PieChart,
    href: "/tools/portfolio",
  },
  {
    title: "Intrinsic value of the share by PER",
    description: "Determine stock value using the Price-to-Earnings ratio method",
    icon: Calculator,
    href: "/tools/per-value",
  },
  {
    title: "Dividend Discount Model",
    description: "Value stocks based on predicted dividends and their growth rate",
    icon: TrendingUp,
    href: "/tools/dividend-model",
  },
  {
    title: "Comparative Market Analysis",
    description: "Compare stock metrics against industry peers and benchmarks",
    icon: BarChart2,
    href: "/tools/market-analysis",
  },
  {
    title: "Risk Assessment Tool",
    description: "Evaluate the risk profile of your investments and strategies",
    icon: Scale,
    href: "/tools/risk-assessment",
  },
]

export default function OptionCards() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {options.map((option, index) => (
          <Link href={option.href} key={index} className={styles.card}>
            <div className={styles.iconContainer}>
              <option.icon className={styles.icon} />
            </div>
            <h3 className={styles.title}>{option.title}</h3>
            <p className={styles.description}>{option.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}