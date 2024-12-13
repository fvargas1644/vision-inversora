'use client'

import styles from '@/styles/search.module.css'
import usePath from '@/hooks/usePath';
import { useState } from 'react';
import useSearch from "@/hooks/useSearch";
import { useDebouncedCallback } from 'use-debounce';
import { CompanyTicker } from "@/lib/sec-edgar/definitions";
import { useRouter } from 'next/navigation';

export default function Search() {
    const router = useRouter();
    const path = usePath();
    const [inputValue, setInputValue] = useState(path.stock);
    const [searchItem, setSearchItem] = useState<CompanyTicker[]>([]);
    const [isOverItem, setIsOverItem] = useState(false);

    const hideResults = () => {
        setSearchItem([]); 
        setIsOverItem(false);
    }

    const handleSearch = useDebouncedCallback(async (value) => {
        const result: CompanyTicker[] = await useSearch(value);
        if (value !== "" && value !== " ") { 
            setSearchItem(result); 
        } else { 
            hideResults()
        }
    }, 300);

    const handleOnChangeInput = async (value: string) => {
        setInputValue(value);
        handleSearch(value);
    }

    const handleOnClickSearchItem = (ticker: string) => {
        setInputValue(ticker);
        hideResults()
        router.push(`/analisis/${ticker}`);
    }

    const HandleSearchRedirection = () => {
        if(inputValue !== "" && inputValue !== " "){ 
            hideResults();
            setInputValue(searchItem[0][2]);
            (searchItem.length > 0)  ? router.push(`/analisis/${searchItem[0][2]}`) : router.push('/analisis'); //Enviar a 404
        }
    }

    return (
        <div className={styles.vi_nav_search_container}>
            <div className={styles.vi_nav_search_items_container}>
                <div className={styles.vi_nav_search_input_container}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(event) => handleOnChangeInput(event.target.value)}
                        onKeyDown={(event) => {if (event.key === "Enter") HandleSearchRedirection()}}
                    />
                    <button
                        className={styles.vi_nav_search_button}
                        onClick={() => HandleSearchRedirection()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${styles.vi_nav_search_icon}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <div className={`${styles.vi_nav_search_results_container} ${searchItem.length === 0 ? styles.isHidden : ''}`}>
                    {searchItem.map((item, index) => (
                        <div
                            className={`${styles.vi_nav_search_result_item} ${index === 0 && !isOverItem ? styles.vi_nav_first_search_result_item : ''}`}
                            onClick={() => handleOnClickSearchItem(item[2])}
                            onMouseOver={() => setIsOverItem(true)}
                            onMouseOut={() => setIsOverItem(false)}
                        >
                            <p>{item[1]}</p>
                            <p><strong>{item[2]}</strong></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}