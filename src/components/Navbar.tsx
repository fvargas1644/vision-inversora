import Link from "next/link";

function Navbar(){
    return(
        <nav className="bg-black w-full sticky z-0 top-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto text-white ">
                <div>   
                    Logo
                </div>
                <div className="">
                    <ul className="font-medium flex flex-col md:flex-row p-2">
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