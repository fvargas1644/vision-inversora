'use client'

import styles from '@/styles/analisis/selectionBar.module.css'
import Link from "next/link";
import { useState } from 'react';

export default function SelectionBar() {
    const [selectedOption, setSelectedOption] = useState('')
    const [inputValue, setInputValue] = useState('')

    return (
        <section className={styles.vi_section}>
            <div className={styles.vi_bar_container}>
                <div>
                    <select name="analysis" 
                        id="analysis" 
                        value={selectedOption} 
                        onChange={(event) => setSelectedOption(event.target.value)}
                    >
                        <option value="disconted-free-cash-flow">Discounted Free Cash Flow</option>
                        <option value="prueba">prueba</option>
                    </select>
                </div>
                <div>
                    
                <input 
                    type="text" value={inputValue} 
                    onChange={(event) => setInputValue(event.target.value)}
                />
                </div>
                <div>
                <Link
                    href={`/analisis/${inputValue}/${selectedOption}`} 
                    className={styles.vi_search_link}>    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`size-6 ${styles.vi_search_icon}`}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </Link>
                </div>
            </div>
        </section>
    )
}