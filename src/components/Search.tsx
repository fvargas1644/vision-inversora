'use client'

import styles from '@/styles/search.module.css'
import useSearch from "@/hooks/useSearch";
import React from 'react';
import { FetchCompanyTickersExchangeResponse } from '@/lib/sec-edgar/definitions';


export default function Search({dataCompany} : {dataCompany: FetchCompanyTickersExchangeResponse}) {
    const {
        inputValue, 
        updateInputValueAndSearch, 
        redirectToAnalysisPageBasedOnInputOrResult, 
        searchResults, 
        isOverItem,
        selectSearchResultAndNavigate,
        setIsOverItemToTrue,
        setIsOverItemToFalse
    } = useSearch(dataCompany);
    

    return (
        <div className={styles.vi_nav_search_container}>
            <div className={styles.vi_nav_search_items_container}>
                <div className={styles.vi_nav_search_input_container}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(event) => updateInputValueAndSearch(event.target.value)}
                        onKeyDown={(event) => {if (event.key === "Enter") redirectToAnalysisPageBasedOnInputOrResult()}}
                    />
                    <button
                        className={styles.vi_nav_search_button}
                        onClick={redirectToAnalysisPageBasedOnInputOrResult}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-6 ${styles.vi_nav_search_icon}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <div className={`${styles.vi_nav_search_results_container} ${searchResults.length === 0 ? styles.isHidden : ''}`}>
                    {searchResults.map((item, index) => (
                        <React.Fragment key={index}>
                            <div
                            className={`${styles.vi_nav_search_result_item} ${index === 0 && !isOverItem ? styles.vi_nav_first_search_result_item : ''}`}
                            onClick={() => selectSearchResultAndNavigate(item[2])}
                            onMouseOver={setIsOverItemToTrue}
                            onMouseOut={setIsOverItemToFalse}
                        >
                            <p>{item[1]}</p>
                            <p><strong>{item[2]}</strong></p>
                        </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>

    )
}