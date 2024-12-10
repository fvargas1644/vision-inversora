import styles from '@/styles/search.module.css'

export default function Search() {
    return (
        <div className={styles.vi_nav_search_container}>
            <div className={styles.vi_nav_searchInput_container}>
                <input type="text" />
                <div className={styles.vi_nav_searchItems_container}>
                    <div>
                        Item 1
                    </div>
                </div>
            </div>
        </div>

    )
}