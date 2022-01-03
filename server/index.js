require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cron = require('node-cron');
const middleware = require('./src/utils/middleware');
const routes = require('./src/routes');
const liigaService = require('./src/services/liiga');
const PORT = process.env.PORT || 5000;
const http = require('http');

app.use(cors());
app.use(middleware.tokenExtractor);
app.use(express.json());

routes(app);
app.use(middleware.errorHandler);

const pollingEnabled = true;

http.createServer(app).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  if (pollingEnabled) {
    liigaService.poll();
    cron.schedule('* * * * *', async () => {
      liigaService.poll();
    });
  }
});
