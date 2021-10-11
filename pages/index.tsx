
import React from 'react';
import Head from 'next/head';
import { OrderBookWithProvider } from '../components/OrderBookWithProvider';


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Order Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <OrderBookWithProvider />
      </main>
  </div>
  );
}