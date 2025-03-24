import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/Welcome.module.css"
import stylesUtils from "@/styles/Utils.module.css"
import TestServer from "./testServer";


export default function Welcome() {
    return (
        <section className={styles.heroSection}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Análisis financiero inteligente para inversores informados</h1>
                <p className={styles.heroDescription}>
                    VisiónInversora le proporciona herramientas y datos de mercado completos
                    para tomar decisiones de inversión informadas. Siga las acciones, analice las tendencias
                    del mercado y construya una cartera más sólida.
                </p>
                <div className={styles.buttonContainer}>
                    <Link href="./analisis" className={stylesUtils.primaryButton}>
                        Explorar Herramientas
                        <ArrowRight className={stylesUtils.buttonIcon} />
                    </Link>
                    <Link href="#" className={stylesUtils.secondaryButton}>
                        Sobre Mí
                    </Link>
                </div>
            </div>
            
        <TestServer />
        </section>
    )
}