import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "Vluchtelingenwerk Nederland – Vivian",
  description:
    "Vluchtelingenwerk Nederland – Word vrijwilliger, vind evenementen en vacatures. Ontmoet Vivian, jouw persoonlijke assistent.",
  keywords:
    "vluchtelingenwerk, vrijwilliger, vluchtelingen, integratie, Nederland, evenementen, vacatures",
  openGraph: {
    title: "Vluchtelingenwerk Nederland – Vivian",
    description:
      "Word vrijwilliger bij Vluchtelingenwerk Nederland. Ontmoet Vivian, jouw persoonlijke assistent.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased">
        <LanguageProvider>
          <a href="#main-content" className="skip-link">
            Ga naar inhoud
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  );
}

