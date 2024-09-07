import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Santuario",
  description: "Prueba Técnica de la empresa DLTCode para Front-end Developer",
};

function App({children,}: {children: React.ReactNode;}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

export default App