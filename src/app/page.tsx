import Welcome from "@/components/Welcome";
import stylesUtils from "@/styles/Utils.module.css"
import styles from "@/styles/Page.module.css"
import Tools from "@/components/Tools";
import Stocks from "@/components/Stocks";
import WhyChoseUs from "@/components/WhyChooseUs";
import TestServer from "@/components/testServer";
import TestClient from "@/components/testClient";

export default async function Page() {
  return (
    <main className={stylesUtils.main}>
      <TestServer />
      <TestClient />
      <Welcome />
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
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Acciones destacadas</h2>
          <p className={styles.sectionDescription}>
            Explore el análisis detallado y la información sobre estos populares valores 
            para fundamentar sus decisiones de inversión.
          </p>
        </div>
        <Stocks />
      </section>
      <section className={styles.section}>
        <WhyChoseUs />
      </section>
    </main>
  );
}
