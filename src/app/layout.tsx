import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BharatEduVerse — Learn for Tomorrow, Build for India",
  description:
    "Choose your studies based on opportunities, not trends. India's most comprehensive education and career discovery platform.",
  keywords: "India education, career guidance, after 10th, UPSC, JEE, NEET, career paths India",
  openGraph: {
    title: "BharatEduVerse",
    description: "Choose Studies Based on Opportunities, Not Trends.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
