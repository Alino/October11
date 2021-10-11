import React from 'react';
import { StateAndDispatch } from "./reducer.types";
import { useOBState } from "./useOBReducer";
import { createContext, ReactNode, useContext } from "react";

export const OrderBookContext = createContext<StateAndDispatch | undefined>(
  undefined
);

type OrderBookProvider = { children: ReactNode };

export const OrderBookProvider = ({ children }: OrderBookProvider) => {
  const { state, dispatch } = useOBState();
  return (
    <OrderBookContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderBookContext.Provider>
  );
};

const ERROR = "OrderBook context is undefined";

export const useOrderBookState = () => {
  const context = useContext(OrderBookContext);
  if (!context) throw new Error(ERROR);
  const { state } = context;
  return state;
};
