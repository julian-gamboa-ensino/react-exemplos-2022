// root-config/main.js
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@single-spa/welcome',
  app: () => System.import('@single-spa/welcome'),
  activeWhen: ['/'],
});

registerApplication(
  'angularApp', 
  () => System.import('angularApp'), 
  location => location.pathname.startsWith('/angular')
);

registerApplication(
  'reactApp', 
  () => System.import('reactApp'), 
  location => location.pathname.startsWith('/react')
);

start({
  urlRerouteOnly: true,
});