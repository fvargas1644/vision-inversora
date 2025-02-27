import "./globals.css";
import { montserrat } from "./fonts";
import { SecEdgarFetchCompanyTickersExchangeResponse } from "@/lib/types/secEdgar";
import { fetchCompanyTickersExchange } from "@/lib/sec-edgar/fetchData";
import Header from "@/components/Header";
 

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const fechCompany : SecEdgarFetchCompanyTickersExchangeResponse = await fetchCompanyTickersExchange();
 
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>
        <div className="vi_content_pages">
          <Header dataCompany={fechCompany}/>
          {children}
        </div>
      </body>
    </html>
  );
}
