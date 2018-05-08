const express = require("express");
const parser = require("body-parser");
const fetch = require('node-fetch');

const app = express()

let lastClientId = 0
const clients = []

app.use(parser.json())

// * Make a route for a POST to path `/clients` x
//   * The server should expect to receive a body as `{"name":"Bob"}` x
//   * The server should increment lastClientId by one. x
//   * The server should create a new object `{name:theName, clientId:lastClientId,lat:"",long:"",location:""}` and add it to the clients array
//   * The server should send back this object as json x

app.get('/clients',(req, res)=>res.json(clients))

app.post('/clients',(req, res)=>{
  lastClientId ++
  const client = {"name":req.body.name, "clientId":lastClientId, "lat": "", "long": "", "location": ""}
  clients.push(client)
  res.json(client)
  
})

app.get('/locations',(req, res)=>res.json(clients))

app.get('/clients/:id',(req, res)=>{
  res.json(clients.find((id)=>id.clientId == req.params.id))
})

app.post('/locations',(req, response)=>{
  const lat = req.body.lat
  const long = req.body.long
  const id = req.body.id
  const client = clients.find(i=>i.clientId==id)

  console.log(client)

  fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`, 
  { 
    method: 'GET', 
    headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
    }
  })
  .then(res => res.json())
  .then(json => {
    client.location = json.address
    client.long = long
    client.lat = lat
    response.json(client)
    console.log(json)
  });

//   {
//     "id":3, 
//     "lat":"30.23",
//     "long":"-97.7"
// }

// {
// 	"name":"Blob",
// 	"clientId":"",
// 	"lat": "", 
// 	"long": "", 
// 	"location": ""
	
//  }
})

app.listen(3001, () => console.log('Listening on port 3001!'))