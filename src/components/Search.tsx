'use client'

import styles from '@/styles/search.module.css'
import usePath from '@/hooks/usePath';
import { useState } from 'react';
import useSearch from "@/hooks/useSearch";
import { useDebouncedCallback } from 'use-debounce';
import { searchItemRedirects } from '@/lib/utils';
import { CompanyTicker } from "@/lib/sec-edgar/definitions";


export default function Search() {
    const path = usePath()
    const [inputValue, setInputValue] = useState(path.stock);
    const [searchItem, setSearchItem] = useState<CompanyTicker[]>([]);
    const [isOverItem, setIsOverItem] = useState(false)

    const handleSearch = useDebouncedCallback(async (value) => {
        const result : CompanyTicker[]  = await useSearch(value);
        (value !== "" && value !== " ") ? setSearchItem(result) : setSearchItem([]);
    }, 300);

    const handleOnChangeInput = async (value: string) => {
        setInputValue(value);
        handleSearch(value);
    }

    const handleOnClickSearchItem = (ticker: string) => {
        setInputValue(ticker);
        setSearchItem([]);
        setIsOverItem(false)
        searchItemRedirects(ticker);
    }

    return (
        <div className={styles.vi_nav_search_container}>
            <div className={styles.vi_nav_searchInput_container}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(event) => handleOnChangeInput(event.target.value)}
                />
                <div className={`${styles.vi_nav_searchItems_container} ${searchItem.length === 0 ? styles.is_hidden : ''}`}>
                    {searchItem.map((item, index) => (
                        <div 
                            className={`${styles.searchItem} ${index === 0 && !isOverItem ? styles.firstSearchItem : ''}`} 
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