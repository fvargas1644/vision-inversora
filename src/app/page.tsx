import Welcome from "@/components/Welcome";
import stylesUtils from "@/styles/Utils.module.css"
import styles from  "@/styles/Page.module.css"
import Tools from "@/components/Tools";

export default async function Page() {
  return (
    <main className={stylesUtils.main}>
      <Welcome/>
      {/* Analysis Tools Section */}
      <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Herramientas de análisis financiero</h2>
                <p className={styles.sectionDescription}>
                Nuestro conjunto de herramientas financieras le ayuda a analizar acciones, 
                calcular valores intrínsecos y optimizar su cartera de inversiones.
                </p>
            </div>
            <Tools />
        </section>
    </main>
  );
}
