import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevOps + IA: Aplicando Modelos de Inteligência Artificial no Aprendizado de DevOps",
  description: "Apresentação interativa sobre como a IA está transformando a forma de aprender automação e infraestrutura DevOps. Por Sandro Souza - CloudServo Remote System",
  keywords: ["DevOps", "Inteligência Artificial", "IA", "Aprendizado", "Automação", "CI/CD", "Docker", "Kubernetes"],
  authors: [{ name: "Sandro Souza" }],
  openGraph: {
    title: "DevOps + IA: Aprendizado Exponencial",
    description: "Como a IA está transformando o aprendizado de DevOps",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
