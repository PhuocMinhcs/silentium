const express = require('express')
const transitionRoute = require('./router/transition')
const app = express()
const port = 3001

// Handle Cross Origin 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})

app.get('/', (req, res) => {
  res.send('Api is working')
})

app.use('/api', transitionRoute);

app.all('*', function (req, res) {
  return res.status(404).json({ error: true, message: "Page not found."});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
