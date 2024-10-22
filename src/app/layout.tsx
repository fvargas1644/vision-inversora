import Navbar from "@/components/Navbar";
import "./globals.css";
import { YFinanceProvider } from "@/context/yFinance";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar/>
        <YFinanceProvider>   
          {children}
        </YFinanceProvider>
      </body>
    </html>
  );
}
