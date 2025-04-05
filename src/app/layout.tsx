import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'react-toastify/ReactToastify.css'
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer"
import {ToastContainer} from 'react-toastify'


const inter = Inter({ subsets: ["latin"] });
// const kufiArabic=Noto_Kufi_Arabic({subsets:['arabic'],weight:['300','500']})
export const metadata: Metadata = {
  title: "Cloud Hosting",
  description: "Cloud hosting project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`} >
        <Header />
        <ToastContainer/>
        <main className="flex-1">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
