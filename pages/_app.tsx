// pages/_app.tsx or pages/_app.js
import type { AppProps } from "next/app";

import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import mqttClient from "@/services/mqttClient";
import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (mqttClient) {
      mqttClient.on("connect", () => {
        console.log("Connected to MQTT broker");
      });
    }
  }, []);

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        {isClient && <Component {...pageProps} />}
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default MyApp;

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
