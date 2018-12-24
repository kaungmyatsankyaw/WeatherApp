const request = require('request');

var gecodeAddress = (address, callback) => {

    var encodeURL = encodeURIComponent(address);


    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURL + '&key=AIzaSyAzdobLVSlDTVuH-1SRQI1F-3I4_rGmLhs',
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable To get location');
        } else if (body.status === 'ZERO_RESULTS') {
            callback(body);
            // callback('Unable To find Address');
        } else if (body.status === 'OK') {
            console.log('Township:'+body.results[0].address_components[1].long_name);
            console.log('Address:' + body.results[0].formatted_address);
            console.log('Lat:' + body.results[0].geometry.location.lat);
            console.log('Long' + body.results[0].geometry.location.lng);
        }
    });
}


module.exports.gecode = gecodeAddress;