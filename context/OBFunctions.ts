import { PriceSize, Spread } from "./OBTypescript.types";
import * as _ from "lodash";

export const MAX_ROWS = 10;

export function mergeData(
  previousData: PriceSize[],
  newData: PriceSize[]
): PriceSize[] {
  const prevObj = _.fromPairs(previousData);
  const nextObj = _.fromPairs(newData);

  Object.keys(nextObj).forEach((priceKey) => {
    if (nextObj[priceKey] === 0) delete prevObj[priceKey];
    else prevObj[priceKey] = nextObj[priceKey];
  });

  const result = _.toPairs(prevObj).reduce((previousVal, currentVal: any) => {
    currentVal[0] = parseFloat(currentVal[0]);
    previousVal.push(currentVal);
    return previousVal;
  }, []);

  return result;
}

export function sliceRows(data: PriceSize[]): PriceSize[] {
  return data.slice(0, MAX_ROWS);
}

export function finalMerge(
  previousData: PriceSize[],
  newData: PriceSize[],
  isBids: boolean
): PriceSize[] {
  if (!newData.length) return previousData;
  let data = mergeData(previousData, newData);

  data = data.sort((a, b) => a[0] - b[0]);
  if (isBids) data = data.reverse();
  data = sliceRows(data);
  return data;
}

export function calcTotalSize(priceSize: PriceSize[]) {
  return priceSize.reduce((prevValue, currentValue, index) => {
    const total =
      index === 0 ? currentValue[1] : currentValue[1] + prevValue[index - 1][2];
    if (currentValue.length > 2) {
      currentValue[2] = total;
    }
    currentValue.push(total);
    prevValue.push(currentValue);
    return prevValue;
  }, []);
}

export function calcSpread(asks, bids): Spread {
  if (!asks.length || !bids.length) return { size: null, percentage: null };
  const lowestAsk = asks[0][0];
  const highestBid = bids[bids.length - 1][0];
  const size = parseFloat((lowestAsk - highestBid).toFixed(2));
  const percentage = parseFloat(((size / lowestAsk) * 100).toFixed(2));
  return { size, percentage };
}
