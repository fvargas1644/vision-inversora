import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/Welcome.module.css"

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
                    <Link href="./analisis" className={styles.primaryButton}>
                        Explorar Herramientas
                        <ArrowRight className={styles.buttonIcon} />
                    </Link>
                    <Link href="#" className={styles.secondaryButton}>
                        Sobre Mí
                    </Link>
                </div>
            </div>
        </section>
    )
}