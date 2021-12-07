const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  routes(app);
});
