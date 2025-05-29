import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientBody } from "./ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Naufal Hafizh Nugraha - Backend Developer & Game Developer",
  description:
    "Backend Developer passionate about building robust systems and creating engaging game experiences. Specialized in Node.js, PostgreSQL, Unity, and scalable architecture design.",
  keywords: [
    "backend developer",
    "game developer",
    "nodejs",
    "postgresql",
    "unity",
    "microservices",
    "api development",
    "full stack developer",
    "software engineer",
    "game design",
  ],
  authors: [{ name: "Naufal Hafizh Nugraha" }],
  creator: "Naufal Hafizh Nugraha",
  publisher: "Naufal Hafizh Nugraha",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://naufalportfolio.netlify.app",
    title: "Naufal Hafizh Nugraha - Backend Developer & Game Developer",
    description:
      "Backend Developer passionate about building robust systems and creating engaging game experiences.",
    siteName: "Naufal Hafizh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naufal Hafizh Nugraha - Backend Developer & Game Developer",
    description:
      "Backend Developer passionate about building robust systems and creating engaging game experiences.",
  },
  verification: {
    google: "google-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClientBody className={inter.className}>{children}</ClientBody>
    </html>
  );
}