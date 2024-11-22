'use client'

import { usePathname } from "next/navigation"

export default function usePath(){
    const path = usePathname()

    const params = path.split('/').slice(2);

    const stock = (params[0] && params[0] !== '') ? params[0] : 'menu_selection_bar'
    let type = (params[1] && params[1] !== '') ? params[1] : ''

    return {
        stock,
        type
    }
}