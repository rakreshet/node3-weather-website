const request = require('request')

const geocode = (address, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFrcmVzaGV0IiwiYSI6ImNrank5aHVnMDB6dWYyb2xzbTUzZXlpMGsifQ.VclEv2lKmC7YbNQ0kTn8hA&limit=1'
    request({ 'url': mapBoxUrl, json: true }, (error, {body}) => {
        const center = body.features[0].center
        callback({ latitude: center[1], longitue: center[0], location: body.features[0].place_name })
    })
}

module.exports = geocode