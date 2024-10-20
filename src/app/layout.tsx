import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
