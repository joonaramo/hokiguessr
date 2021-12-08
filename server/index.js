require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const routes = require('./src/routes');
const liigaService = require('./src/services/liiga');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  routes(app);
  liigaService.poll();
  cron.schedule('* * * * *', async () => {
    liigaService.poll();
  });
});
