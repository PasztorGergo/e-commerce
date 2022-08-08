import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppShell, MantineProvider } from "@mantine/core";
import { Footer, Header } from "../components";
import { Global } from "@emotion/react";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import CartProvider from "../context/CartProvider";
import AuthProvider from "../context/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      theme={{
        fontFamily: "'Inter', sans-serif",
        components: {
          Anchor: {
            styles: { root: { textDecoration: "none", color: "#ff506e" } },
          },
          Text: { styles: { root: { color: "#1E293B" } } },
          Title: { styles: { root: { color: "#1E293B" } } },
        },
      }}
    >
      <Global
        styles={(theme) => ({
          "body, html": { background: "#F1F5F9" },
          "a:hover": { textDecoration: "none !important" },
          main: {
            padding: "0 !important",
          },
        })}
      />
      <AuthProvider>
        <CartProvider>
          <ModalsProvider>
            <NotificationsProvider>
              <AppShell header={<Header />} footer={<Footer />}>
                <Component {...pageProps} />
              </AppShell>
            </NotificationsProvider>
          </ModalsProvider>
        </CartProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default MyApp;
