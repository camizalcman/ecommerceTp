import { Geist, Geist_Mono, Sora } from "next/font/google";
import { AppContextProvider } from "@/contexts/AppContext";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartLateral from "@/components/CartLateral";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crusta",
  description: "Pizzas hechas a tu gusto",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppContextProvider>
          <Navbar />
          {children}
          <Footer />
          <CartLateral />
        </AppContextProvider>
      </body>
    </html>
  );
}
