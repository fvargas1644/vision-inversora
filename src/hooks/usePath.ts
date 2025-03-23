'use client'

import { usePathname } from "next/navigation"

export default function usePath(){
    const path = usePathname()

    const params = path.split('/').slice(2);

    const ticker = (params[0] && params[0] !== '') ? params[0] : ''
    const type = (params[1] && params[1] !== '') ? params[1] : 'menu_selection_bar'

    return {
        ticker,
        type
    }
}