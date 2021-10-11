import { ReadyState } from 'react-use-websocket';
import { Dispatch } from 'react';
import { PriceSize, TradingPairs } from './OBTypescript.types';

export enum ActionName {
  UpdateReadyState = 'UPDATE_READY_STATE',
  SetAsksAndBids = 'SET_ASKS_AND_BIDS',
  UpdateAsksAndBids = 'UPDATE_ASKS_AND_BIDS',
  UpdateCurrentPair = 'UPDATE_CURRENT_PAIR',
  UpdateIsDocumentHidden = 'UPDATE_IS_DOCUMENT_HIDDEN'
}

export type Action = {
  type: ActionName
  payload?: any
}

export type State = {
  asks: Array<PriceSize>
  bids: Array<PriceSize>
  readyState: ReadyState,
  currentPair: TradingPairs,
  isDocumentHidden: boolean
}

export interface StateAndDispatch {
  state: State
  dispatch: Dispatch<Action>
}
