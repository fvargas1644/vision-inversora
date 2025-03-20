import "./globals.css";
import { montserrat } from "./fonts";
import { secEdgarCompanyTickers } from "@/lib/types/secEdgar";
import { fetchSecEdgarCompanyTickers } from "@/lib/sec-edgar/fetchData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
 

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const fechCompany : secEdgarCompanyTickers = await fetchSecEdgarCompanyTickers();
 
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>
        <div className="vi_content_pages">
          <Header dataCompany={fechCompany}/>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
