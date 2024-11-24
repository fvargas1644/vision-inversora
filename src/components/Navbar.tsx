'use client'

import Link from "next/link";
import styles from '@/styles/nav.module.css'
import { usePathname } from 'next/navigation';
import Logo from "./Logo";
import { useState } from "react";

function Navbar() {
    const [buttonMenuState, setbuttonMenuState] = useState(false)
    const path = usePathname()
    const showLogin = buttonMenuState ? styles.showMenu : ''
    const showLinks = buttonMenuState ? styles.showMenu : ''

    return (
        <nav className={styles.vi_nav}>
            <div className={styles.vi_nav_items_container} >
                <a className={styles.vi_nav_logo} href="/">
                    <Logo/>
                </a>
                <span className={styles.vi_nav_menuButton_container}>
                    <button className={styles.vi_nav_menuButton} onClick={() => setbuttonMenuState(!buttonMenuState)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    </button>
                </span>
                <div className={`${showLinks} ${styles.vi_nav_links_container}` }>
                    <ul >
                        <li className={path === "/" ? styles.isActive : ''}>
                            <Link
                                href={'/'}
                                className={styles.vi_nav_link}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${styles.vi_nav_home_icon}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <span>Home</span>
                            </Link>
                        </li>

                        <li className={path.startsWith("/analisis") ? styles.isActive : ''}>

                            <Link
                                href={'/analisis'}
                                className={styles.vi_nav_link}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${styles.vi_nav_analysis_icon}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                </svg>
                                <span>Análisis</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={`${showLogin}  ${styles.vi_nav_login_container}`}>
                    <a href="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${styles.vi_nav_login_icon}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                        <p>Login</p> 
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;