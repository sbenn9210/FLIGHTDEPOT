

//const WEATHER_API_KEY = "b65c894b0f65976f2dd9c8f4a7842d37"
const WEATHER_API_KEY = "ea44b4249b6547efabd58be82508bc5b"
//const WEATHER_API_KEY = "AIzaSyAlyyxkszLfFl6EPdpk9GupxvHuVq3YJPA"


let btnSearch = $('#btnSearch')
let txtDestination = $('#txtDestination')
let datepickerDepart =$('#datepickerDepart')
let datepickerReturn =$('#datepickerReturn')
var dateAndIconsArray = []

$(document).ready(function(){

    datepickerDepart.click(function(){
        console.log("datepicker")
        let destination = txtDestination.val()
        accessCityDetails(destination)
       console.log(dateAndIconsArray)

        // let dt =$('#datetimepicker').data("DateTimePicker").date()
        // let dateString= dt.toString
         
        // console.log(dateString)

    })

})




// variable cityString = city of destination
function accessCityDetails(cityString){
fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+cityString)
.then(function(response){
    return response.json()
}).then(function(json){

    //console.log("accessCityDetails")
    //console.log(json)
    var datePickerArray =  getCityLocation(json)
    dateAndIconsArray.push(datePickerArray)
    console.log(dateAndIconsArray)
    
})

}


function getCityLocation(cityObj){
    
    let latitude = cityObj.results[0].geometry.location.lat
    let longitude = cityObj.results[0].geometry.location.lng
    return getWeatherData(latitude,longitude)
    
 }



function getWeatherData(lat,long) {

    let date = new Date()
    let today = date.getTime()
    let weatherIcons=[]


    for (let index=0;index <= 30;index++){
        let nextDay = Math.round(today/1000)+(index*86400) 
        console.log(nextDay)
   
    
        let base_url= "https://api.darksky.net/forecast/"
        let searchQuery = base_url + WEATHER_API_KEY + "/"+ lat +","+long + ","+ nextDay

        fetch(searchQuery)
            .then(function(response){
            return response.json()
            }).then(function(json){
        
            weatherIcons.push({ day:nextDay,weather:json.daily.data[0].icon })

    }).catch(function(ex) {
        console.log(ex)
      })

     }
    return displayWeatherIcons(weatherIcons)
}



function displayWeatherIcons(weatherIcons){

    return weatherIcons;
        // weatherIcons.forEach(function(icon){       
        //    let date = (icon).day
        //    console.log(date)
           
            
        //    for(date in icon){
        //        //console.log(icon[day])
        //        if(icon[date]=="rain") {
        //            console.log("rain")
        //        }
        //    }
        //    })
               
    }


// let destination = "Miami"
// console.log('starting script')
// let wd = accessCityDetails(origin)
// console.log("===========weather data============")
// console.log(wd)