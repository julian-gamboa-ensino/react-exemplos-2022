import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@meu-app/react-page', // Nome único para o microfrontend
  app: () => System.import('@meu-app/react-page'), // Carrega o microfrontend
  activeWhen: ['/react-page'], // Rota que ativa o microfrontend
});

start();