/* eslint-disable @typescript-eslint/no-require-imports */
const next = require('next');
const expressApp = require('./expressApp');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT =
  process.env.NODE_ENV === 'test' ? 3002 : process.env.API_PORT || 3001;

app.prepare().then(() => {
  expressApp.all('*', (req, res) => handle(req, res));
  expressApp.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
    console.log(`> Swagger UI available at http://localhost:${PORT}/api/docs`);
  });
});

module.exports = expressApp;
