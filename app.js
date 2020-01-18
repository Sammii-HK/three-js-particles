const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const port = 4000

app.use(express.static(path.join(__dirname, 'public')))
//
// app.get('/', (req, res) => res.send('Hello World!'))

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.use('/', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
