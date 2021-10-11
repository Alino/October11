import { PriceSize } from "./OBTypescript.types";
import {
  websocketDataFeedMock,
  websocketDeltaMock,
  askOrdersMockWithTotal,
  bidOrdersMockWithTotal,
} from "./websocketMocks";
import {
  finalMerge,
  mergeData,
  calcTotalSize,
  calcSpread,
  MAX_ROWS,
} from "./OBFunctions";

describe("#OrderBook", () => {
  it("calcSpread", () => {
    const asks = [
      [10, 1],
      [12, 2],
    ];

    const bids = [
      [1, 1],
      [2, 2],
    ];
    const spread = calcSpread(asks, bids);
    // console.log(spread)
    expect(spread).toEqual({
      size: 8,
      percentage: 80,
    });
  });

  describe("#mergeData", () => {
    it("should merge correctly", () => {
      const prevData: PriceSize[] = [
        [3, 1, 4],
        [2, 1, 4],
        [4, 1, 3],
        [22, 142, 2],
      ];

      const newData: PriceSize[] = [
        [1, 1],
        [2, 0],
        [4, 1],
        [5, 1],
      ];

      const expectedResult = [
        [1, 1],
        [3, 1],
        [4, 1],
        [5, 1],
        [22, 142],
      ];

      expect(mergeData(prevData, newData)).toStrictEqual(expectedResult);
    });

    it("should update the orderbook bids and asks correctly", () => {
      const expectedBids: PriceSize[] = [
        [48356.0, 1450.0],
        [48355.5, 1957.0],
        [48353.0, 1000.0],
        [48351.0, 6510.0],
        [48341.0, 4231.0],
        [48340.5, 12977.0],
        [48340.0, 80492.0],
        [48339.5, 2500.0],
        [48337.5, 30465.0],
        [48337.0, 12500.0],
      ];
      const expectedAsks: PriceSize[] = [
        [48356.5, 543.0],
        [48358.0, 28.0],
        [48362.5, 5594.0],
        [48367, 3342],
        [48367.5, 2500.0],
        [48371.0, 1000.0],
        [48373.5, 12500.0],
        [48375.5, 1833.0],
        [48377.0, 4337.0],
        [48379.0, 5361.0],
      ];
      expect(expectedBids.length).toEqual(MAX_ROWS);
      expect(expectedAsks.length).toEqual(MAX_ROWS);
      const bids = finalMerge(
        websocketDataFeedMock.bids,
        websocketDeltaMock.bids,
        true
      );
      const asks = finalMerge(
        websocketDataFeedMock.asks,
        websocketDeltaMock.asks,
        false
      );
      expect(bids).toEqual(expectedBids);
      expect(asks).toEqual(expectedAsks);
    });
  });

  describe("#calcTotalSize", () => {
    it("should return PriceSize object with assigned total size", () => {
      const bids = calcTotalSize(websocketDataFeedMock.bids as PriceSize[]);
      expect(bids).toEqual(bidOrdersMockWithTotal);

      const asks = calcTotalSize(websocketDataFeedMock.asks as PriceSize[]);
      expect(asks).toEqual(askOrdersMockWithTotal);
    });
  });
});
