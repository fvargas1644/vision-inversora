"use client"

import React, { useRef } from "react"
import styles from "@/styles/Header.module.css"
import useSearch from "@/hooks/useSearch";
import { FetchCompanyTickersExchangeResponse } from '@/lib/sec-edgar/definitions';

export default function Header({dataCompany} : {dataCompany: FetchCompanyTickersExchangeResponse}) {
  const dropdownRef = useRef<HTMLDivElement>(null)

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
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper} ref={dropdownRef}>
          <input
            type="text"
            placeholder="Buscar acciones..."
            value={inputValue}
            className={styles.searchInput}
            onChange={(event) => updateInputValueAndSearch(event.target.value)}
            onKeyDown={(event) => {if (event.key === "Enter") redirectToAnalysisPageBasedOnInputOrResult()}}
          />
          <button className={styles.searchButton} onClick={redirectToAnalysisPageBasedOnInputOrResult}>
          </button>
          {searchResults.length > 0 && (
            <div className={styles.dropdown}>
              {searchResults.map((item, index) => (
                <React.Fragment key={index}>
                <div 
                  key={index} 
                  className={styles.dropdownItem}
                  onClick={() => selectSearchResultAndNavigate(item[2])}
                  onMouseOver={setIsOverItemToTrue}
                  onMouseOut={setIsOverItemToFalse}
                >
                  <div className={styles.stockSymbol}>{item[2]}</div>
                  <div className={styles.stockName}>{item[1]}</div>
                </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}