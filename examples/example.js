const Fryd = require('../src/index');

const fryd = new Fryd(20, 10);

fryd.getTrophiesFromList('<token>', '<id>')
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
