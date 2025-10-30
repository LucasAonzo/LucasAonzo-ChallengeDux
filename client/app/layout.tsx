import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import MainLayout from "./components/layout/MainLayout";

// Orden de imports CSS: crucial para evitar conflictos de estilos
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./components/layout/layout.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: "Challenge Dux - ABM Usuarios",
  description: "Sistema de gestión de usuarios - Challenge Dux Software",
  icons: {
    icon: '/iso-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <PrimeReactProvider>
          <MainLayout>{children}</MainLayout>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
