export type Price = number;
export type Size = number;
export type TotalSize = number;
export type PriceSize = [Price, Size, TotalSize?]

export type OrderBookFeed = {
  numLevels: number
  feed: string
  bids: PriceSize[],
  asks: PriceSize[],
  product_id: string
}

export type OrderBookDeltaMessage = {
  feed: string,
  bids: PriceSize[],
  asks: PriceSize[]
  product_id: string,
}

export enum TradingPairs {
  PI_XBTUSD = "PI_XBTUSD",
  PI_ETHUSD = "PI_ETHUSD"
}

export type Spread = {
  size: number
  percentage: number
}