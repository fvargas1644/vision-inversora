'use client'

import { secEdgarCompanyTickers, SecEdgarTicker } from "@/lib/types/secEdgar";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import usePath from '@/hooks/usePath';

export default function useSearch(dataCompany : secEdgarCompanyTickers){

    const router = useRouter();
    const path = usePath();
    const [inputValue, setInputValue] = useState(path.ticker);
    const [searchResults, setSearchResults] = useState<SecEdgarTicker[]>([]);

    const fetchCompanyExchangeResults = (ticker : string) => {
        const searchResults = [];

        for (let item of dataCompany.data) {
            if (item[2].toLowerCase().includes(ticker.toLowerCase()) || item[1].toLowerCase().includes(ticker.toLowerCase())) {
                searchResults.push(item)
            }
            if (searchResults.length > 9) break
        }
        return searchResults;
    }

    const clearSearchResults = () => {
        setSearchResults([]);
    }


    const updateInputValueAndSearch = async (value: string) => {
        setInputValue(value);
        if (value !== "" && value !== " ") { 
            const results = fetchCompanyExchangeResults(value);
            setSearchResults(results); 
        } else { 
            clearSearchResults();
        }
    }

    const selectSearchResultAndNavigate = (ticker: string) => {
        setInputValue(ticker);
        clearSearchResults()
        router.push(`/analisis/${ticker}`);
    }

    const redirectToAnalysisPageBasedOnInputOrResult = () => {
        if(inputValue !== "" && inputValue !== " "){ 
            clearSearchResults();
            if (searchResults.length > 0) setInputValue(searchResults[0][2]);
            (searchResults.length > 0)  ? router.push(`/analisis/${searchResults[0][2]}`) : router.push(`/analisis/${inputValue}`); 
        }
    }
    
    return {
        inputValue, 
        updateInputValueAndSearch, 
        redirectToAnalysisPageBasedOnInputOrResult, 
        searchResults, 
        selectSearchResultAndNavigate,
    };
    
}