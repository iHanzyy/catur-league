import { Inter, Poppins, Orbitron } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';

// Font untuk teks umum - Inter (sangat modern dan readable)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

// Font untuk heading - Poppins (elegan dan eye-catching)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: "--font-poppins",
  display: 'swap',
});

// Font untuk brand - Orbitron (futuristic)
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: "--font-orbitron",
  display: 'swap',
});

export const metadata = {
  title: "Catur League",
  description: "Track chess matches and scores with authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                
                document.documentElement.classList.add(theme);
                document.documentElement.setAttribute('data-theme', theme);
                document.body?.classList.add(theme);
              } catch (e) {
                console.error('Theme initialization error:', e);
              }
            })();
          `
        }} />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${orbitron.variable} font-sans antialiased`}
      >
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
