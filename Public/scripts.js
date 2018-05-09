//Global Variables, TODO: move out of global
let lat = ''
let long = ''
let clientId = 1

//function call to post user to client
const postClient = ()=> {
  const name = {"name": document.getElementById('name').value}
  let data = {}
  !document.getElementById('name').value
  ? ''
  : (fetch("http://localhost:3001/clients",{
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(name)
  })
    .then(res=>res.json())
    .then(json=>{
      data = json
      clientId = json[json.length-1].clientId
    })
  )}

//function call to post user location
const postLocation = ()=>{
  fetch("http://localhost:3001/locations",{
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "id":clientId,
      "lat":lat,
      "long":long
    })
  })
  .then(res=>res.json())
  .then(json=>{
    data = json
  })
}

//Get location: this code block comes directly from mdn geolocation docs
const retrieveLocation = ()=>{
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  const success = (pos)=> {
    const crd = pos.coords;
    lat = crd.latitude
    long = crd.longitude
  }
  
  const error = (err)=> {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);
  postLocation()
}

//TODO: rewrite this function for interval tracking
function interval(func, wait, times){
  var interv = function(w, t){
    return function(){
      if(typeof t === "undefined" || t-- > 0){
        setTimeout(interv, w);
        try{
          func.call(null);
        }
        catch(e){
          t = 0;
          throw e.toString();
        }
      }
    };
  }(wait, times);
  
  setTimeout(interv, wait);
};

//get location and posts to /locations every 2 seconds
interval(()=>{
  retrieveLocation()
},2000)
