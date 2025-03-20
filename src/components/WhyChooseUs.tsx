import Image from "next/image";
import styles from "@/styles/WhyChooseUs.module.css"
import stylesUtils from "@/styles/Utils.module.css"
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default function WhyChoseUs(){
    return (
          <div className={styles.whyChooseUsContainer}>
            <div className={styles.imageContainer}>
              <Image
                src="/images/ImageComputer.png"
                alt="Financial planning"
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.whyChooseUsContent}>
                <h2 className={styles.sectionTitle}>Por qué elegir VisiónInversora</h2>
                <div className={styles.featuresList}>
                    <div className={styles.featureItem}>
                    <div className={styles.featureNumberContainer}>
                        <span className={styles.featureNumber}>1</span>
                    </div>
                    <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>Análisis Integral</h3>
                        <p className={styles.featureDescription}>
                        Nuestras herramientas proporcionan un análisis profundo de acciones, mercados y oportunidades de inversión.
                        </p>
                    </div>
                    </div>
                    <div className={styles.featureItem}>
                    <div className={styles.featureNumberContainer}>
                        <span className={styles.featureNumber}>2</span>
                    </div>
                    <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>Datos en Tiempo Real</h3>
                        <p className={styles.featureDescription}>
                        Mantente actualizado con datos y tendencias del mercado en tiempo real para tomar decisiones de inversión oportunas.
                        </p>
                    </div>
                    </div>
                    <div className={styles.featureItem}>
                    <div className={styles.featureNumberContainer}>
                        <span className={styles.featureNumber}>3</span>
                    </div>
                    <div className={styles.featureContent}>
                        <h3 className={styles.featureTitle}>Interfaz Amigable</h3>
                        <p className={styles.featureDescription}>
                        Nuestra interfaz intuitiva hace que el análisis financiero complejo sea accesible para todos.
                        </p>
                    </div>
                    </div>
                </div>
                <div className={styles.learnMoreContainer}>
                    <Link href="#" className={styles.learnMoreLink}>
                    Aprende más sobre nuestro enfoque
                    <ArrowRight className={stylesUtils.buttonIcon} />
                    </Link>
                </div>
            </div>
          </div>
    )
}