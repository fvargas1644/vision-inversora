'use client'
import { fetchCompanyTickersExchange } from "@/lib/sec-edgar/fetchData";
import { CompanyTicker, FetchCompanyTickersExchangeResponse } from "@/lib/sec-edgar/definitions";
import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/navigation';
import usePath from '@/hooks/usePath';

export default function useSearch(){

    const router = useRouter();
    const path = usePath();
    const [inputValue, setInputValue] = useState(path.stock);
    const [searchResults, setSearchResults] = useState<CompanyTicker[]>([]);
    const [isOverItem, setIsOverItem] = useState(false);

    const fetchCompanyExchangeResults = async (stock : string) => {
        const searchResults : CompanyTicker[]= [];
        const fetchCompany: FetchCompanyTickersExchangeResponse = await fetchCompanyTickersExchange()

        for (let item of fetchCompany.data) {
            if (item[2].toLowerCase().includes(stock.toLowerCase()) || item[1].toLowerCase().includes(stock.toLowerCase())) {
                searchResults.push(item)
            }
            if (searchResults.length > 9) break
        }
        return searchResults;
    }

    const clearSearchResults = () => {
        setSearchResults([]); 
        setIsOverItem(false);
    }

    const setIsOverItemToTrue  = () => setIsOverItem(true)
    const setIsOverItemToFalse  = () => setIsOverItem(false)

    const performSearchWithDebounce = useDebouncedCallback(async (value) => {
        if (value !== "" && value !== " ") { 
            const results: CompanyTicker[] = await fetchCompanyExchangeResults(value);
            setSearchResults(results); 
        } else { 
            clearSearchResults()
        }
    }, 300);

    const updateInputValueAndSearch = async (value: string) => {
        setInputValue(value);
        performSearchWithDebounce(value);
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
        isOverItem,
        selectSearchResultAndNavigate,
        setIsOverItemToTrue,
        setIsOverItemToFalse
    };
    
}