const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(cors());


app.use(express.static(path.join(__dirname, '../frontend')));


app.get('/api/hello', (req, res) => {
  res.send('Hello World');
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
