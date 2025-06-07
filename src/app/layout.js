import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  icons: "https://i.postimg.cc/R0NpvBfZ/white.png",
  title: "Royal Lens",
  description: "Royal Lens Photography Booking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" />
        <Header/>
        <Navbar/>
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
