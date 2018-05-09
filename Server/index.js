const express = require("express");
const parser = require("body-parser");
const fetch = require('node-fetch');

const app = express()

let lastClientId = 0
const clients = []

app.use(parser.json())
app.use(express.static('../public'))


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
  res.json(clients)
})

app.get('/locations',(req, res)=>res.json(clients))

app.get('/clients/:id',(req, res)=>{
  res.json(clients.find((id)=>id.clientId == req.params.id))
})

// * Make a route for a POST to path `/locations` 
//   * The server should expect to receive a body as `{"id":3, lat:"30.23",long:"-97.7"}`
//   * use this information to make a node-fetch call to a [Reverse GeoLocation Server](https://repl.it/@jw56578/TerrificSnappyConditionals)
//   * extract the address from this call
//   * find the appropriate object from the array by id with find
//   * update the keys `lat, long, location`
//   * send back this object as json
// * Make a route for a GET to path /locations
//   * send back the `clients` array as json
// * Test that all routes work in Postman

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
  });

})

app.listen(3001, () => console.log('Listening on port 3001!'))