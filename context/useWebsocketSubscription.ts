import {
  OrderBookFeed,
  OrderBookDeltaMessage,
  TradingPairs,
} from "./OBTypescript.types";
import { Action, ActionName } from "./reducer.types";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Dispatch, useEffect } from "react";

const webSocketUrl = "wss://www.cryptofacilities.com/ws/v1/orderbook";
const EVENT_SUBSCRIBE = "subscribe";
const EVENT_UNSUBSCRIBE = "unsubscribe";
const options = {
  event: EVENT_SUBSCRIBE,
  feed: "book_ui_1",
  product_ids: [TradingPairs.PI_XBTUSD],
};

export const useWebsocketSubscription = (
  tradingPair: TradingPairs,
  isDocumentHidden: boolean,
  dispatch: Dispatch<Action>
) => {
  const { readyState, sendJsonMessage } = useWebSocket(webSocketUrl, {
    onError: console.error,
    onMessage: (message) => {
      const data: OrderBookFeed = JSON.parse(message.data);
      if (!data.bids || !data.asks) return;

      const subscriptionData = data as OrderBookDeltaMessage;
      if (subscriptionData?.feed?.indexOf("snapshot") > -1) {
        dispatch({ type: ActionName.SetAsksAndBids, payload: data });
      } else if (subscriptionData.feed === "book_ui_1") {
        dispatch({ type: ActionName.UpdateAsksAndBids, payload: data });
      }
    },
  });

  useEffect(() => {
    if (readyState !== ReadyState.OPEN && readyState !== ReadyState.CLOSED) {
      return;
    }

    // unsubscribe
    options.event = EVENT_UNSUBSCRIBE;
    sendJsonMessage(options);

    // subscribe
    if (!isDocumentHidden) {
      console.log(tradingPair);
      options.event = EVENT_SUBSCRIBE;
      options.feed = "book_ui_1";
      options.product_ids = [tradingPair];
      sendJsonMessage(options);
    }
  }, [readyState, sendJsonMessage, tradingPair, isDocumentHidden]);

  useEffect(() => {
    dispatch({ type: ActionName.UpdateReadyState, payload: readyState });
  }, [dispatch, readyState]);
};
