# ACA Tracker
Let's create an app that will let us see where people are.

## Create a server
* Make sure its listening x
* Make sure it can serve static files x
* Make sure to use body-parser x
* create a variable `lastClientId = 0` x
* create a variable `clients = []`x
* Make a route for a POST to path `/clients` x
  * The server should expect to receive a body as `{"name":"Bob"}` x
  * The server should increment lastClientId by one. x
  * The server should create a new object `{name:theName, clientId:lastClientId,lat:"",long:"",location:""}` and add it to the clients array
  * The server should send back this object as json x
* Make a route for a POST to path `/locations` 
  * The server should expect to receive a body as `{"id":3, lat:"30.23",long:"-97.7"}`
  * use this information to make a node-fetch call to a [Reverse GeoLocation Server](https://repl.it/@jw56578/TerrificSnappyConditionals)
  * extract the address from this call
  * find the appropriate object from the array by id with find
  * update the keys `lat, long, location`
  * send back this object as json
* Make a route for a GET to path /locations
  * send back the `clients` array as json
* Test that all routes work in Postman

  
## Create web pages for the client
* do not use setInterval
* public/index.html
  * Nothing fancy
  * 1 textbox, `Name: <input>` , 1 button `<button>Track Me</button>`
  * onclick of the "Track Me" button 
    * do a fetch POST to /client and send the value from the text box in the body as {"name":"Bob"}
    * expect back data that looks like `{name:theName, clientId:2,lat:"",long:""}`
    * save the clientId in a variable
    * start a timer
      * every 2 seconds 
      * use the [geo location api of the browser](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) to get longitute and latitude coordinates
      * do a fetch POST to /locations, send a body as `{"id":clientId, lat:"30.23",long:"-97.7"}`
* public/admin.html
  * start a timer
  * every 1 second 
  * make a fetch GET to /locations
  * expect back an array of objects  `[{name:theName, clientId:lastClientId,lat:"",long:"",location:""}]`
  * loop the array
  * append a div to the body of the page with `name` and `location` in it
  
  
## Resources
* [How do you make a POST request in fetch](https://docs.google.com/presentation/d/123k7T6_SvdaE3D9kJR-kMhi50l_IR2DgFPM5wUpnBdk/edit#slide=id.g245f370550_0_8)
* [geo location api of the browser](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition)
* [Reverse GeoLocation Server](https://repl.it/@jw56578/TerrificSnappyConditionals)

  
  
 
## Make It Real
* Create or move your server code to [Repl Express](https://repl.it/languages/express)
* Open index.html in a mobile web browser
* Open admin.html in a desktop web browser
* Move around and watch the address change

