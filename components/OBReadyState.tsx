import React, { memo } from "react";
import { ReadyState } from "react-use-websocket";
import { useOrderBookState } from "../context/orderBookContext";

const connectionStatus: Record<ReadyState, string> = {
  [ReadyState.CONNECTING]: "Connecting",
  [ReadyState.OPEN]: "Open",
  [ReadyState.CLOSING]: "Closing",
  [ReadyState.CLOSED]: "Closed",
  [ReadyState.UNINSTANTIATED]: "Uninstantiated",
};
export type ConnectionStatus = {
  readyState: ReadyState;
};

const wasReadyStateChanged = (
  previousProps: ConnectionStatus,
  nextProps: ConnectionStatus
) => previousProps.readyState === nextProps.readyState;

export const ConnectionStatus = memo(
  ({ readyState }: ConnectionStatus) => (
    <span
      className={
        connectionStatus[readyState] === "Open"
          ? "dark:text-green-500"
          : "dark:text-red-500"
      }
    >
      {connectionStatus[readyState]}
    </span>
  ),
  wasReadyStateChanged
);

export const OBReadyState = () => {
  const state = useOrderBookState();
  return <ConnectionStatus readyState={state.readyState} />;
};
