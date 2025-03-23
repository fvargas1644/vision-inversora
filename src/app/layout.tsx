import "./globals.css";
import { montserrat } from "./fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
 

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //const fechCompany : secEdgarCompanyTickers = await fetchSecEdgarCompanyTickers();
 
  return (
    <html lang="es">
      <head>
          {/* <link rel="shortcut icon" href={favicon} /> */}
          <link rel="icon" type="image/ico"  href="/images/favicon.ico" />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        <div className="vi_content_pages">
          <Header/>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
