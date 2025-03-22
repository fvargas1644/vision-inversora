'use client';
 
import { useEffect } from 'react';
import styles from "@/styles/ErrorPage.module.css";

 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Something went wrong!</h1>
        <p className={styles.message}>Please try again later.</p>
        <button 
          className={styles.button}
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => reset()
          }
        >
          Refresh Page
        </button>
      </div>
    </main>
  );
}