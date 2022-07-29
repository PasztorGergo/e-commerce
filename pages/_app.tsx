import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppShell, MantineProvider } from "@mantine/core";
import { Header } from "../components";
import { Global } from "@emotion/react";

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
        },
      }}
    >
      <Global
        styles={(theme) => ({
          "body, html": { background: "#F1F5F9" },
          "a:hover": { textDecoration: "none !important" },
        })}
      />

      <AppShell header={<Header />}>
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  );
}

export default MyApp;
