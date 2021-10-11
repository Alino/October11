import React from 'react';
import { OrderBookProvider } from "../context/orderBookContext";
import OrderBook from "./OrderBook";

export const OrderBookWithProvider = () => (
  <OrderBookProvider>
    <OrderBook />
  </OrderBookProvider>
);
