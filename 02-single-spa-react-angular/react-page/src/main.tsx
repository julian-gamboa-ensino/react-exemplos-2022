import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import singleSpaReact from 'single-spa-react';
import App from './App'; 

const lifecycles = singleSpaReact({
  React,
  ReactDOM: {
    render: (rootComponent: any, domElement: HTMLElement) => {
      createRoot(domElement).render(rootComponent); 
    },
    // Add 'hydrate' if needed for server-side rendering
  },
  rootComponent: App,
  errorBoundary(err, info, props) {
    console.error("Error in React microfrontend:", err, info,props);
    return <div>An error occurred in the React microfrontend</div>;
  },
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;


/*
import React from 'react';
import { Container, createRoot } from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './App.tsx';
import './index.css';

const lifecycles = singleSpaReact({
  React,
  ReactDOM: {
    render: (rootComponent: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, domElement: Container) => {
      createRoot(domElement).render(
        <React.StrictMode>
          {rootComponent}
        </React.StrictMode>
      );
    },
  }, // Aqui passamos o método render para usar createRoot do React 18
  rootComponent: App,
});

export const { bootstrap, mount, unmount } = lifecycles;
*/