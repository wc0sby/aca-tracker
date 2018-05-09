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
//function call to get locations
const getLocation = ()=>{
  fetch("http://localhost:3001/locations")
  .then(res=>res.json())
  .then(json=>{
    json.map((location)=>{
      // console.log(`${location.name} ${Object.values(location.location)}`)
      let div = document.createElement("div")

      div.innerHTML = `${location.name} ${Object.values(location.location)}`
      document.body.appendChild(div)
    })
  })
}

//returns a div of the locations every second
interval(()=>{
  getLocation()
},1000)