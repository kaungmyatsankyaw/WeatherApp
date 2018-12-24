const request = require('request');
const yargs = require('yargs');
const axios = require('axios');

const gecode = require('./gecode/gecode');

const argv = yargs.
options({
        a: {
            demand: true,
            alias: "address",
            describe: "Fetch to get Data",
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

// gecode.gecode(argv.address, (errorMessage, result) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(result, undefined, 2));
//     }
// });

let encodeURL = encodeURIComponent(argv.address);
let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURL + '&key=AIzaSyAzdobLVSlDTVuH-1SRQI1F-3I4_rGmLhs';


axios.get(url).then(response => {
    if (response.data.staus === 'ZERO_RESULTS') {
        console.log('unable to find address');
    }
    let lat = response.data.results[0].geometry.location.lat;
    let lang = response.data.results[0].geometry.location.lng;
    console.log('Address : ' + response.data.results[0].formatted_address );
    let weatherUrl = 'https://api.darksky.net/forecast/4677bd0a941ae28020c0ee68f295214b/' + lat + ',' + lang;

    return axios.get(weatherUrl);
}).then( (res ) => {
   
    console.log('Temperature : ' + res.data.currently.temperature );

}).catch((e) => {
    console.log(e)
});