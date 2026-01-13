import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Human in the Looop | Automation That Knows When to Ask",
  description:
    "Custom automation systems where software does the grinding — and humans step in when judgment, context, or consequence matter. Join the waitlist.",
  keywords: [
    "automation",
    "human-in-the-loop",
    "workflow automation",
    "AI operations",
    "business automation",
  ],
  openGraph: {
    title: "Human in the Looop | Automation That Knows When to Ask",
    description:
      "Custom automation systems where software does the grinding — and humans step in when judgment, context, or consequence matter.",
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
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
