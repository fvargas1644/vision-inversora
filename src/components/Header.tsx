"use client"

import { useRef } from "react"
import styles from "@/styles/Header.module.css"



export default function Header() {
  const dropdownRef = useRef<HTMLDivElement>(null)

  return (
    <header className={styles.header}>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper} ref={dropdownRef}>
          <input
            type="text"
            placeholder="Buscar acciones..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
          </button>
        </div>
      </div>
    </header>
  )
}