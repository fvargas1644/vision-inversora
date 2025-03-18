import MarcketOverView from '@/components/analisis/ticker/MarcketOverView';
import styles from '@/styles/analisis/ticker/sidebar/Page.module.css'
import Sidebar from '@/components/analisis/ticker/sidebar/SideBar';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.newsSection}>
                    <main className={styles.mainContent}>
                        {children}
                    </main>
                </div>
                <div className={styles.marketOverview}>
                    <div>
                        <MarcketOverView />
                    </div>
                </div>
            </div>
        </main>
    );
}