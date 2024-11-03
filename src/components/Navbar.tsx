import Link from "next/link";
import styles from '@/styles/nav.module.css'

function Navbar(){
    return(
        <nav className={styles.vi_nav}>
            <div className={styles.vi_nav_items_container}>
                <div>   
                    Logo
                </div>
                <div className={styles.vi_nav_links_container}>
                    <ul >
                        <li>
                            <Link
                                href={'/'}
                                className={styles.vi_nav_link}
                            >
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/top'}
                                className={styles.vi_nav_link}
                            >
                                <span>Top</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/analisis'}
                                className={styles.vi_nav_link}
                            >
                                <span>Análisis</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    Login
                </div>
            </div>
        </nav>
    );
}

export default Navbar;