import Link from "next/link"
import { Calculator, DollarSign, TrendingUp } from "lucide-react"
import styles from "@/styles/analisis/ticker/OptionsCard.module.css"



export default function OptionCards({ticker} : {ticker: string}) {

  const options = [
    {
      title: "Acciones",
      description: "Explora algunas de las acciones en el meracado",
      icon: DollarSign,
      href: "/analisis/",
    },
    {
      title: "Disconted Free Cash Flow",
      description: "Analiza las acciones con ",
      icon: Calculator,
      href: `./${ticker}/discounted-free-cash-flow`,
    },
    {
      title: "Valuation PER",
      description: "Analiza las acciones con ",
      icon: TrendingUp,
      href: `./${ticker}/valuation-pe-ratio`,
    },
  ]

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