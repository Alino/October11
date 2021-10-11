import { Action, ActionName, State, StateAndDispatch } from "./reducer.types";
import { TradingPairs } from "./OBTypescript.types";
import { useReducer } from "react";
import { ReadyState } from "react-use-websocket";
import { finalMerge } from "./OBFunctions";
import { useWebsocketSubscription } from "./useWebsocketSubscription";

export const initialState: State = {
  bids: [],
  asks: [],
  readyState: ReadyState.UNINSTANTIATED,
  currentPair: TradingPairs.PI_XBTUSD,
  isDocumentHidden: false,
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionName.UpdateReadyState:
      return {
        ...state,
        readyState: action.payload,
      };
    case ActionName.SetAsksAndBids: {
      const { bids, asks } = action.payload;
      return {
        ...state,
        asks,
        bids,
      };
    }
    case ActionName.UpdateAsksAndBids: {
      const { bids: previousBids, asks: previousAsks } = action.payload;
      const asks = finalMerge(state.asks, previousAsks, false);
      const bids = finalMerge(state.bids, previousBids, true);
      return {
        ...state,
        asks,
        bids,
      };
    }
    case ActionName.UpdateCurrentPair: {
      return {
        ...state,
        currentPair: action.payload,
      };
    }
    case ActionName.UpdateIsDocumentHidden: {
      return {
        ...state,
        isDocumentHidden: action.payload,
      };
    }
    default:
      throw new Error();
  }
};

export const useOBState = (): StateAndDispatch => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useWebsocketSubscription(state.currentPair, state.isDocumentHidden, dispatch);
  return { state, dispatch };
};
