import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../util/provider";
import Appbar from "../components/Appbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Leetforce",
  description: "Submit code and participate in contests",
  icons:{
    // icon:"../public/force.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
            
        {/* <div className="h-[100%] w-[100%]"> */}
        <Appbar/>
        <div style={{ overflowX: 'hidden' }}>
            {/* Adjust max-width and other styles as needed */}
            {children}
          </div>
        {/* </div> */}
      </body>
          </Providers>
    </html>
  );
}
