import Navbar from "@/components/Navbar";
import "./globals.css";
import { montserrat } from "./fonts";
 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>
        <Navbar/>
        <div className="vi-pages-container">
          {children}
        </div> 
      </body>
    </html>
  );
}
