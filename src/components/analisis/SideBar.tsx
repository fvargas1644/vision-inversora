import Link from "next/link"
import { BarChart2, CircleChevronLeft } from "lucide-react"
import styles from '@/styles/analisis/SideBar.module.css'
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {

    const router = useRouter();
    const pathname = usePathname()

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <ul className={styles.menuList}>
                    
                <li className={styles.menuItem}>
                    <Link href='./' className={styles.menuLink}>
                            <CircleChevronLeft className={styles.menuIcon} />
                            <span className={styles.menuText}>Menu</span>
                    </Link>
                    
                </li>
                <li className={styles.menuItem}>
                    <Link href='./discounted-free-cash-flow' className={styles.menuLink}>
                        
                            <BarChart2 className={styles.menuIcon} />
                            <span className={styles.menuText}>DFCF</span>
                    </Link>
                
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

