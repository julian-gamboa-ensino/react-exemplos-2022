import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@meu-app/react-app',
  app: () => System.import('@meu-app/react-app'), 
  activeWhen: ['/react'] 
});

start();