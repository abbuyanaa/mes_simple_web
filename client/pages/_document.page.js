import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'
 
class CustomDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const originalRenderPage = ctx.renderPage
  //   // Run the React rendering logic synchronously
  //   ctx.renderPage = () => originalRenderPage({
  //     // Useful for wrapping the whole react tree
  //     enhanceApp: (App) => App,
  //     // Useful for wrapping in a per-page basis
  //     enhanceComponent: (Component) => Component,
  //   });
  //   // Run the parent `getInitialProps`, it now includes the custom `renderPage`
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return initialProps;
  // };

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:site_name" content="153CNS MES" />
          {/* <meta property="og:url" content="" /> */}
          <meta property="og:type" content="MES WEB" />
          <meta property="og:title" content="153CNS MES Web" />
          <meta property="og:description" content="MES Web" />
          {/* <meta property="og:image" content="/images/index/sample0.png" /> */}
        </Head>
        <body className="dx-viewport">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
 
export default CustomDocument;
