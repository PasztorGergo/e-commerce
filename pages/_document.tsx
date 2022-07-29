import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <meta charSet="utf-8" />
        <meta name="keywords" content="eCommerce, Pastore" />
        <meta name="author" content="Gergő Pásztor" />
        <meta
          name="description"
          content="Test eCommerce site built with Next.js and MongoDB"
        />
        <meta name="og:title" content="Pastore" />
        <meta
          name="og:description"
          content="Test eCommerce site built with Next.js and MongoDB"
        />
        <meta name="og:image" content="" />
        <meta name="og:url" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="" />
        <meta
          name="twitter:description"
          content="Test eCommerce site built with Next.js and MongoDB"
        />
        <meta name="twitter:title" content="Pastore" />
        <meta name="twitter:image" content="" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
