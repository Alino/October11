import React, { useContext, useEffect } from "react";
import OBTable, { OBTableTypes } from "./OBTable";
import OBToggleButton from "./OBToggleButton";
import { OrderBookContext } from "../context/orderBookContext";
import { OBReadyState } from "./OBReadyState";
import { calcSpread } from "../context/OBFunctions";
import { ActionName } from "../context/reducer.types";
import throttle from "react-throttle-render";
import { Spread } from "../context/OBTypescript.types";

const THROTTLE_TIME = 500;
const ThrottledOBTable = throttle(THROTTLE_TIME)(OBTable);

export default function OrderBook() {
  const { state, dispatch } = useContext(OrderBookContext);

  const handleVisibilityChange = () => {
    dispatch({
      type: ActionName.UpdateIsDocumentHidden,
      payload: document.hidden,
    });
  };

  useEffect(() => {
    window.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      window.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const humanReadablePair = `${state.currentPair
    .split("_")[1]
    .substr(0, 3)} / ${state.currentPair.split("_")[1].substr(3, 6)}`;
  const spread = calcSpread(state.asks, state.bids);
  type SpreadProps = { spread: Spread };
  const Spread = ({ spread }: SpreadProps) => (
    <>
      Spread {spread.size} ({spread.percentage})%
    </>
  );

  return (
    <>
      <div className="flex justify-between text-white m-1 p-1 border-b border-solid dark:border-gray-700">
        <p>Order Book ({humanReadablePair})</p>
        <span className="text-center dark:text-gray-500 md:flex hidden">
          <Spread spread={spread} />
        </span>
        <p className="dark:text-gray-500">
          Connection <OBReadyState />
        </p>
      </div>

      <div className="flex flex-col flex-col-reverse md:flex-row">
        <ThrottledOBTable type={OBTableTypes.bids} orders={state.bids} />
        <span className="text-center dark:text-gray-500 md:hidden">
          <Spread spread={spread} />
        </span>
        <ThrottledOBTable type={OBTableTypes.asks} orders={state.asks} />
      </div>
      <div className="flex justify-center mt-10">
        <OBToggleButton />
      </div>
    </>
  );
}
