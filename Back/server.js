console.log('Hello !');

const express = require('express');
const serveIndex = require('serve-index');

const app = express();
const port = 3000;

// use pour tous les verbes

app.use('/', (req, res, next) => {
  console.log('req: ', req.url);
  next();
});

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.listen(port, () => {
  console.log(`Example app listing on port ${port}`);
});
