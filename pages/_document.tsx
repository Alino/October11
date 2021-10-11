import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="dark">
        <Head />
        <body style={{backgroundColor: '#0D131E'}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}