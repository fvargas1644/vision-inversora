import styles from '@/styles/analisis/selectionBar.module.css'

export default function SelectionBar() {

    return (
        <section className={styles.vi_section}>
            <div className={styles.vi_bar_container}>
                <div>
                    
                    <select name="analysis" id="analysis">
                        <option value="discounted-free-cash-flow">Discounted Free Cash Flow</option>
                        <option value="prueba">prueba</option>
                    </select>

                </div>
                <div>
                    
                <input type="text" />
                </div>
                <div>
                <button className={styles.vi_search_button}>    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`size-6 ${styles.vi_search_icon}`}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
                </div>
            </div>
        </section>
    )
}