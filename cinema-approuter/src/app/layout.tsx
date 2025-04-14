import Header from "@/components/header";
import "./globals.css";
import style from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={style.container}>
        <Header />
        {children}
      </body>
    </html>
  );
}
