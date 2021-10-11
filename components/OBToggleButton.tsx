import { TradingPairs } from "../context/OBTypescript.types";
import { ActionName } from "../context/reducer.types";
import React, { useContext, useState } from "react";
import {
  OrderBookContext,
  useOrderBookState,
} from "../context/orderBookContext";

export default function OBToggleButton() {
  const { dispatch } = useContext(OrderBookContext);
  let { currentPair } = useOrderBookState();
  const [loading, setLoading] = useState(false);

  const onClickToggle = () => {
    currentPair =
      currentPair === TradingPairs.PI_XBTUSD
        ? TradingPairs.PI_ETHUSD
        : TradingPairs.PI_XBTUSD;
    dispatch({
      type: ActionName.UpdateCurrentPair,
      payload: currentPair,
    });
    setLoading(!loading);
    setTimeout(() => {
      setLoading(loading);
    }, 1000);
  };

  return (
    <button
      onClick={onClickToggle}
      className={
        "dark:bg-purple-700 dark:hover:bg-purple-500 text-white font-bold py-2 px-4 inline-flex items-center border border-transparent text-base leading-6 font-medium rounded-md text-white transition ease-in-out duration-150" +
        (loading && "cursor-not-allowed")
      }
      disabled={loading}
    >
      <svg
        className={
          "animate-spin -ml-1 mr-3 h-5 w-5 text-white " +
          (loading ? "visible" : "hidden")
        }
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {loading === true ? "Toggling" : "Toggle Feed"}

    </button>
  );
}
