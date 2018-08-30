const Fryd = require('../src/index');

const fryd = new Fryd(20, 10);

fryd.getTokenFromClientCred('<client_id>', '<client_secret>')
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
