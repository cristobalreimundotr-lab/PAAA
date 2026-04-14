import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans"
});

export const metadata = {
  title: "FamilyBrothers Propiedades",
  description: "Comisión 2% con respaldo legal para vender propiedades en Santiago."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
