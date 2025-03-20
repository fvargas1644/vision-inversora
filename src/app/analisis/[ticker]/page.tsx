import OptionCards from "@/components/analisis/ticker/OptionCards"
import styles from "@/styles/analisis/ticker/Page.module.css"


export default async function Page({ params }: { params: { ticker: string } }) {
    return (
    <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Herramientas Financieras</h1>
          <p className={styles.subtitle}>
          Explore nuestro conjunto de herramientas de análisis 
          financiero para tomar decisiones de inversión con conocimiento de causa.
          </p>
        </div>
        <OptionCards ticker={params.ticker} />
      </main>
    )
}