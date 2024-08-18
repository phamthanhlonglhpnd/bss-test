const express = require('express')
const app = express()
const port = 3000

app.post('/check-phone-number', (req, res) => {
  const {phoneNumber} = req.body
  const exists = orders.includes(phoneNumber)
  return res.json({{exists}})
})

app.post('/save-phone-number', (req, res) => {
  const {phoneNumber} = req.body
  orders.save(phoneNumber)
  return res.json({{success: true}})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})