"use client";

import ScrollEffects from "@/components/effects/ScrollEffects";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ReactLenis } from "lenis/react";
import { Provider } from "react-redux";
import { store } from "../store";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Provider store={store}>
          <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>
            <Header />
            <ScrollEffects />
            <main>{children}</main>
            <Footer />
          </ReactLenis>
        </Provider>
      </body>
    </html>
  );
}
