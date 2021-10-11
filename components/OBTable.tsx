import React from 'react';
import { calcTotalSize } from "../context/OBFunctions";
import { PriceSize } from "../context/OBTypescript.types";

const MAX_ROWS = 9;

export enum OBTableTypes {
  asks = "asks",
  bids = "bids",
}

type Props = {
  type: OBTableTypes;
  orders: PriceSize[];
};

export default function OBTable({ type, orders }: Props) {
  const slicedOrders = calcTotalSize(orders.slice(-MAX_ROWS));
  const depthSlicedOrders = slicedOrders;

  const depthStyle = (type: OBTableTypes, order: PriceSize) => {
    const greenColor = "rgb(1, 54, 52, 0.8)";
    const redColor = "rgb(66, 28, 41, 0.8)";

    const color = type === OBTableTypes.bids ? greenColor : redColor;
    const percentage = (
      (order[2] / depthSlicedOrders[depthSlicedOrders.length - 1][2]) *
      100
    ).toFixed(2);
    let position;
    if (window.matchMedia("(max-width: 800px)").matches) position = "right";
    else if (type === OBTableTypes.bids) position = "left";
    else if (type === OBTableTypes.asks) position = "right";
    return {
      background: `linear-gradient(to ${position}, ${color} ${percentage}%, transparent 0%)`,
    };
  };

  return (
    <div className="flex flex-col flex">
      <div className="-my-2 overflow-x-auto sm:-mx-6">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <table className="w-full table-fixed">
              <thead className="dark:bg-gray-750">
                <tr
                  className={
                    "flex justify-evenly md:flex visible " +
                    (type === OBTableTypes.bids
                      ? "flex-row-reverse flex hidden"
                      : "flex visible")
                  }
                >
                  <th
                    scope="col"
                    className="w-1/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="w-1/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="w-1/3 px-6 py-3 text-left text-xs font-medium dark:text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody
                className={
                  "dark:bg-gray-750 flex flex-col " +
                  (type === OBTableTypes.asks &&
                    "flex flex-col-reverse md:flex-col")
                }
              >
                {slicedOrders.map((order, i) => (
                  <tr
                    key={i}
                    style={depthStyle(type, order)}
                    className={
                      "flex justify-evenly " +
                      (type === OBTableTypes.bids ? "md:flex-row-reverse" : "")
                    }
                  >
                    <td
                      className={
                        "w-1/3 px-6 py-1 whitespace-nowrap text-sm text-left "
                        +
                        (type === OBTableTypes.asks
                          ? "dark:text-red-500"
                          : "dark:text-green-500")
                      }
                    >
                      {parseFloat(order[0]).toLocaleString('en', { minimumFractionDigits: 2 })}

                    </td>
                    <td className="w-1/3 px-6 py-1 whitespace-nowrap text-sm text-left font-medium text-gray-200">
                      {parseFloat(order[1]).toLocaleString('en')}

                    </td>
                    <td className="w-1/3 px-6 py-1 whitespace-nowrap text-sm text-left text-gray-200">
                      {parseFloat(order[2]).toLocaleString('en')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
