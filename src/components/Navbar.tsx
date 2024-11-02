import Link from "next/link";
import '@/styles/nav.css'

function Navbar(){
    return(
        <nav className='vi-nav'>
            <div className='vi-nav-items-container'>
                <div>   
                    Logo
                </div>
                <div className='vi-nav-links-container'>
                    <ul >
                        <li>
                            <Link
                                href={'/'}
                                className='vi-nav-link'
                            >
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/top'}
                                className='vi-nav-link'
                            >
                                <span>Top</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/analisis'}
                                className='vi-nav-link'
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