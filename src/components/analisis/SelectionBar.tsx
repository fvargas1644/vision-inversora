'use client'

import usePath from '@/hooks/usePath';
import styles from '@/styles/analisis/selectionBar.module.css'
import Link from "next/link";
import { useState } from 'react';
import useSearch from "@/hooks/useSearch";
import { useDebouncedCallback } from 'use-debounce';


export default function SelectionBar() {
    const path = usePath()
    const [selectValue, setSelectValue] = useState(path.type);
    const [inputValue, setInputValue] = useState(path.stock);
    const [searchItem, setSearchItem] = useState([]);

    const handleSearch = useDebouncedCallback(async (value) => {
        console.log("Se ejecuta")
        const result = await useSearch(value);
        (value !== "" && value !== " ")  ? setSearchItem(result) : setSearchItem([])
    }, 300);

    const handleOnChangeInput = async (value : string) => {
        setInputValue(value);
        handleSearch(value)
    }

    return (
        <section className={styles.vi_section}>
            <div className={styles.vi_bar_container}>
                <div>
                    <select name="analysis" 
                        id="analysis" 
                        value={selectValue} 
                        onChange={(event) => setSelectValue(event.target.value)}
                    >
                        <option value="menu_selection_bar">Menu</option>
                        <option value="disconted-free-cash-flow">Discounted Free Cash Flow</option>
                    </select>
                </div>
                <div className={styles.input_container}>
                    <input 
                        type="text" value={inputValue} 
                        onChange={(event) => handleOnChangeInput(event.target.value)}
                    />
                    
                    <div className={styles.searchItem_container}>
                            {searchItem.map((item)=>(
                                <div className={styles.searchItem}>
                                    {item[1]}
                                </div>
                            ))}
                    </div>
                </div>
                <div>
                <Link
                    href={`/analisis/${inputValue}/${(selectValue === 'menu_selection_bar') ? '' : selectValue}`} 
                    className={styles.vi_search_link}>    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${styles.vi_search_icon}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </Link>
                </div>
            </div>
        </section>
    )
}