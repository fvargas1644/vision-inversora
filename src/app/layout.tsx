import Navbar from "@/components/Navbar";
import "./globals.css";
import { montserrat } from "./fonts";
import { FetchCompanyTickersExchangeResponse } from "@/lib/sec-edgar/definitions";
import { fetchCompanyTickersExchange } from "@/lib/sec-edgar/fetchData";
import Header from "@/components/Header";
 

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const fechCompany : FetchCompanyTickersExchangeResponse = await fetchCompanyTickersExchange(); 
 
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>
        
      <Header dataCompany={fechCompany}/>
        <Navbar dataCompany={fechCompany}/>
        {children}
      </body>
    </html>
  );
}
