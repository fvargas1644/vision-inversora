import styles from "@/styles/Footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h3 className={styles.footerTitle}>VisiónInversora</h3>
          <p className={styles.footerDescription}>
           Proporciona herramientas inteligentes de análisis financiero 
           para tomar decisiones de inversión con conocimiento de causa.
          </p>
          <div className={styles.copyright}>
            <p className={styles.copyrightText}>
              &copy; {new Date().getFullYear()} VisiónInversora. 
            </p>
          </div>
        </div>
      </footer>
    )
}