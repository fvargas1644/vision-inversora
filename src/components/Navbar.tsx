import Link from "next/link"
import { useState } from "react"
import styles from "@/styles/Navbar.module.css"
import { Menu, X } from "lucide-react"
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const path = usePathname()

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logo}>
              VisiónInversora
            </Link>
          </div>
          <div className={styles.desktopMenu}>
            <Link href="/" className={`${styles.menuItem} ${path === "/" ? styles.isActive : ''}`}>
              Home
            </Link>
            <Link href="/analisis" className={`${styles.menuItem} ${path.startsWith("/analisis") ? styles.isActive : ''}`}>
              Análisis
            </Link>
          </div>
          <div className={styles.mobileMenuButton}>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={styles.menuToggle}>
              <span className={styles.srOnly}>Open main menu</span>
              {isMobileMenuOpen ? (
                <X className={styles.menuIcon} aria-hidden="true" />
              ) : (
                <Menu className={styles.menuIcon} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileMenuItem}>
            Home
          </Link>
          <Link href="/analisis" className={styles.mobileMenuItem}>
            Análisis
          </Link>
        </div>
      )}
    </nav>
  )
}

