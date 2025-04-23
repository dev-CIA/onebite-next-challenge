import Header from "@/components/header";
import "./globals.css";
import style from "./layout.module.css";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={style.container}>
        <Header />
        {children}
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
