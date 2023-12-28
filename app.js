const express = require('express')
const app = express()

//Static assets
app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.listen(5000, () => {console.log('server is listening on port 5000...')})
