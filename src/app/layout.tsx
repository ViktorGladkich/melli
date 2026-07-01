import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { QuickAddDrawer } from "@/components/product/quick-add-drawer";

import { getLocalization } from "@/lib/shopify";

export const metadata: Metadata = {
  metadataBase: new URL('https://melli-swart.vercel.app/'),
  title: {
    template: "%s | MILLY",
    default: "MILLY | Premium Abayas & Modest Fashion",
  },
  description: "Entdecke die exklusive Kollektion von MILLY. Hochwertige Abayas, Hijabs und Tuniken für den modernen, bescheidenen Look.",
  keywords: ["Abaya", "Hijab", "Modest Fashion", "MILLY", "Tuniken", "Islamische Kleidung"],
  openGraph: {
    title: "MILLY | Premium Abayas & Modest Fashion",
    description: "Entdecke die exklusive Kollektion von MILLY. Hochwertige Abayas, Hijabs und Tuniken für den modernen, bescheidenen Look.",
    url: 'https://melli-swart.vercel.app/',
    siteName: 'MILLY Fashion',
    locale: 'de_DE',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const countries = await getLocalization();

  return (
    <html
      lang="de"
      className="h-full antialiased font-sans"
    >
      <body className="min-h-full flex flex-col bg-white">
        <div className="flex-1 flex flex-col relative z-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <Navbar countries={countries} />
        <CartDrawer />
        <QuickAddDrawer />
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
