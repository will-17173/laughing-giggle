const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());
app.use(express.static('../../services/photo'))
app.get('*', function(){});
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port)
