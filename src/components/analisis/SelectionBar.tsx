'use client'

import usePath from '@/hooks/usePath';
import styles from '@/styles/analisis/selectionBar.module.css'
import { useState } from 'react';


export default function SelectionBar() {
    const path = usePath()
    const [selectValue, setSelectValue] = useState(path.type);

    const redirectBySelectValue = (value : string) =>{
        setSelectValue(value)
        if(value === "menu_selection_bar") {
            // Redireccionar 
        } else if (value === "disconted_free_cash_flow") {
            // Redireccionar
        }
    }

    
    return (
        <section className={styles.vi_section}>
            <div className={styles.vi_bar_container}>
                <div>
                    <select name="analysis" 
                        id="analysis" 
                        value={selectValue} 
                        onChange={(event) => redirectBySelectValue(event.target.value)}
                    >
                        <option value="menu_selection_bar">Menu</option>
                        <option value="disconted_free_cash_flow">Discounted Free Cash Flow</option>
                    </select>
                </div>
            </div>
        </section>
    )
}