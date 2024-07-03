import express from 'express';
const app = express();
const port = 3000;
import React from 'react';
import { Page } from './views/Page';

import ReactDOMServer from 'react-dom/server';

app.get('/', (req, res) => {
  const elem = React.createElement(Page, {});
  const pageHtml = ReactDOMServer.renderToStaticMarkup(elem);
  res.send(`
  <html>
    <head>
      <link rel="stylesheet" href="/css/main.css"/>
    </head>
    <body>
      <div id="root">${pageHtml}</div>
      <script src="/js/main.js"></script>
    </body>
  </html>`);
});

app.use(express.static('static'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
