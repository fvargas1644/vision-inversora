import OptionCards from "@/components/analisis/ticker/OptionCards"
import styles from "@/styles/analisis/ticker/Page.module.css"


export default async function Page({ params }: { params: { ticker: string } }) {
    return (
    <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Financial Tools</h1>
          <p className={styles.subtitle}>
            Explore our suite of financial analysis tools to make informed investment decisions
          </p>
        </div>
        <OptionCards ticker={params.ticker} />
      </main>
    )
}