'use client'

import Link from "next/link"
import { BarChart2, CircleChevronLeft } from "lucide-react"
import styles from '@/styles/analisis/sidebar/SideBar.module.css'

export default function Sidebar() {


    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <ul className={styles.menuList}>

                    <li className={styles.menuItem}>
                        <Link href='./' className={styles.menuLink}>
                            <CircleChevronLeft className={styles.menuIcon} ></CircleChevronLeft>
                            <span className={styles.menuText}>Menu</span>
                        </Link>

                    </li>
                    <li className={styles.menuItem}>
                        <Link href='./discounted-free-cash-flow' className={styles.menuLink}>

                            <BarChart2 className={styles.menuIcon} />
                            <span className={styles.menuText}>Discounted Free Cash Flow</span>
                        </Link>
                    </li>
                    <li className={styles.menuItem}>
                        <Link href='./valuation-pe-ratio' className={styles.menuLink}>

                            <BarChart2 className={styles.menuIcon} />
                            <span className={styles.menuText}>Valoración Ratio PE</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

