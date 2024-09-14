import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./App"; // O caminho do seu componente App

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, info, props) {
    // Customize a boundary for your micro frontend
    return <div>Error occurred in micro frontend</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
