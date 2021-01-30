const request = require('request')

const weather = (position, callback) => {
    const latitude = position.latitude
    const longitue = position.longitue
    const location = position.location
    const url = 'http://api.weatherstack.com/current?access_key=bceb026cbb2c5d2a4a030cd6f5957291&query=' + latitude + ',' + longitue
    request({ 'url': url, json: true }, (error, response) => {
        if(error) {
            console.log(error)
            return error
        }
        const data = response.body.current
        callback({weather: data, location: location})
    })
}

module.exports = weather