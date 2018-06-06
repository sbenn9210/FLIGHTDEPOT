var numberAdults = 1
let classOfService = 'ECONOMY'
let typeOfTrip = 'ONEWAYTRIP'
let departureDate = '2018-7-04'
let origin = 'JFK'
let destination = 'MIA'
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
        "Authorization": "Basic ZnJhbmR1bHVjQGdtYWlsLmNvbTo4N0Y4NzREOQ==",
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
    $.each(outboundFlightsArray, (index, flight) => {

        // Flight Segment Object 
        let flightSegment = outboundFlightsArray[index].FlightSegment[0]

        // Segment Reference Object
        let segmentReference = segmentReferenceArray[0]

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
        let totalAdultFare = segmentReference.PTC_FareBreakdown.Adult.TotalAdultFare

    })

});