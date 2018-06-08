var numberAdults = 1
let classOfService = 'ECONOMY'
let typeOfTrip = 'ONEWAYTRIP'
let departureDate = '2018-7-04'
let origin = 'JFK'
let destination = 'SDQ'
classOfService = 'ECONOMY'
var flightDetails = {
    "ResponseVersion": "VERSION41",
    "FlightSearchRequest": {
        "Adults": numberAdults,
        "Child": "0",
        "ClassOfService": classOfService,
        "InfantInLap": "0",
        "InfantOnSeat": "0",
        "Seniors": "0",
        "TypeOfTrip": typeOfTrip,
        "SegmentDetails": [{
                "DepartureDate": departureDate,
                "DepartureTime": "0000",
                "Destination": destination,
                "Origin": origin
            }
        ]
    }
}
var apiCall = {
    "async": true,
    "crossDomain": true,
    "url": "https://api-dev.fareportallabs.com/air/api/search/searchflightavailability",
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Basic ZnJhbmR1bHVjQGdtYWlsLmNvbTpmbGlnaHRkZXBvdDEyMw==",
        "Cache-Control": "no-cache",
        "Postman-Token": "38e78197-4179-4e24-8511-89c3934256d4"
    },
    "processData": false,
    "data": JSON.stringify(flightDetails)
}


// AJAX API Call
$.ajax(apiCall).done(function (response) {

    let outboundFlightsArray = response.FlightResponse.FpSearch_AirLowFaresRS.OriginDestinationOptions.OutBoundOptions.OutBoundOption

    let segmentReferenceArray = response.FlightResponse.FpSearch_AirLowFaresRS.SegmentReference.RefDetails

    if(outboundFlightsArray.length){
      var spinner = $("#spinner")
      spinner.remove()
    }

    // instead of injecting DOM for every item / row, build a long string and inject
    // into the DOM once

    // Add a single event on the <table> element using "event delegation"

    function clickPlusBtn (evt) {
      // evt.data.your_stuff
      // put some defensive code that makes sure everyting looks right

      //
    }

    // $('#theTable').on('click', '.plus-btn', clickPlusBtn)
    //
    // var htmlStr = ''
    // $.each(array, function (rowData) {
    //   htmlStr += buildTheRow(rowData)
    // })
    // $('#theTable').html(htmlStr)
    // $('#theTable').on('click', '.row-btn', clickedTheRow)

    $.each(outboundFlightsArray, (index, flight) => {


        // Flight Segment Object
        let flightSegment = outboundFlightsArray[index].FlightSegment[0]

        // Segment Reference Object
        let segmentReference = segmentReferenceArray[index]

        let departureAirport = flightSegment.DepartureAirport.LocationCode
        let departureDateTime = flightSegment.DepartureDateTime
        let arrivalAirport = flightSegment.ArrivalAirport.LocationCode
        let arrivalDateTime = flightSegment.ArrivalDateTime
        let flightDuration = flightSegment.FlightDuration
        let marketingAirline = flightSegment.MarketingAirline.Code
        let operatedByAirline = flightSegment.OperatedByAirline.CompanyText
        let flightCabin = flightSegment.FlightCabin
        let flightNumber = flightSegment.FlightNumber
        let stopQty = flightSegment.StopQuantity
        let totalAdultFare = parseFloat(Math.round(segmentReference.PTC_FareBreakdown.Adult.TotalAdultFare * 100) / 100).toFixed(2)

        var entry =  `
        <tr class="table_row" data-id="{{id}}">
          <th id="airline" scope="col"><img class="flight-img" src='https://a1.r9cdn.net/rimg/provider-logos/airlines/v/${operatedByAirline}.png?crop=false&width=108&height=92&fallback=default2.png&_v=e9d74b31db77b6207fb6f03d73b66cbaa8358b50'></th>
          <th id="flightTime" scope="col">${departureDateTime.slice(11, ) + ' - ' + arrivalDateTime.slice(11, )}</th>
          <th id="stops" scope="col">${stopQty} stops</th>
          <th id="duration" scope="col">${flightDuration + 'hrs'} <br> ${departureAirport} - ${arrivalAirport} </th>
          <th scope="col">Price <br> $${totalAdultFare}</th>
          <th>
            <button type="button" class="" data-toggle="modal" id="modal" data-target="#exampleModal">
              <i class="fas fa-plus fa-2x"></i>
            </button>
          </th>
        </tr>


        `
        $('#table_body').append(entry)


    })});


// <i class="fas fa-plus fa-2x></i>



    // ${index % 2 === 0?  'class="table-warning"' : "" }
