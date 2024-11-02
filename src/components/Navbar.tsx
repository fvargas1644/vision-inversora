import Link from "next/link";
import styles from '@/styles/header.module.css'

function Navbar(){
    return(
        <nav className="">
            <div className="">
                <div>   
                    Logo
                </div>
                <div className="">
                    <ul className="">
                        <li>
                            <Link
                                href={'/'}
                            >
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/top'}
                            >
                                <span>Top</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/analisis'}
                            >
                                <span>Análisis</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;