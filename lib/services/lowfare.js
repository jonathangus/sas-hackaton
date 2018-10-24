const got = require('got')
const NodeGeocoder = require('node-geocoder')
const { here: { appid, appcode } } = require('../config')
const pMap = require('p-map')
const fs = require('fs')
const flatten = require('array-flatten')
const moment = require('moment')

const geocoder = NodeGeocoder({
  provider: 'here',
  appId: appid,
  appCode: appcode
})

// doing this since we use heroku, MVP. Yes I hate myself for this
const getFilePath = file => `./tmp/${file}.json`
const writeFile = (file, items) => fs.writeFile(getFilePath(file), JSON.stringify(items), 'utf8', () => console.log('DONE'))
const readFile = (path, opts = 'utf8') => {
  return new Promise((res, rej) => {
       fs.readFile(path, opts, (err, data) => {
           if (err) rej(err)
           else res(data)
       })
   })
}

async function getFlightTimeForCity (city) {
  if(!city.coordinates) {
    return city
  }
  const { body: data } = await got(`https://flighttime-calculator.com/calculate?lat1=59.6498&lng1=17.92380000000003&lat2=${city.coordinates.latitude}&lng2=${city.coordinates.longitude}&departure_datetime=10/20/2018 2:19 AM`)

  return Object.assign({}, city, { flightInformation: JSON.parse(data) })
}

async function getFlightTimes (data) {
  return pMap(data, getFlightTimeForCity, { concurrency: 2 })
}

async function saveDestinations () {
  const { body: data } = await got('https://www.sas.se/appdata/marketselector/countryinfo.json')
  const destinations = JSON.parse(data).sites.map(({ countryName, origins }) => ({ countryName, origins }))
  const dataWithGeocodes = await setGeocodes(destinations)
  const airportCodes = dataWithGeocodes.map(( { location: { airportCode } }) => airportCode)
  const lowFares = await getLowFares(airportCodes)
  const dataWithLowFaresAndGeocode = dataWithGeocodes.map(itm => ({ ...lowFares.find((item) => (item.destinationAirport.code === itm.location.airportCode) && item), ...itm }))
  const dataToSave = await getFlightTimes(dataWithLowFaresAndGeocode)


  return writeFile('destinations', dataToSave)
}

async function getLowFares (to, from = 'arn') {
  const url = `https://api.flysas.com/offers/flightproduct/lowestFare?from=${from}&to=${to.join(',')}&startDate=${moment().format('YYYYMMDD0000')}&endDate=${moment().add(1, 'years').format('YYYYMMDD0000')}}&paxType=ADT&displayType=MONTHLY&pos=SE&tripType=O`
  const { body } = await got(url)
  const { searchResponse: data } = JSON.parse(body)

  return data
}

async function getDestinations () {
  const data = JSON.parse(await readFile(getFilePath('destinations')))

  return data
}

async function setGeocodes (destinations) {
  const data = await pMap(destinations, getGeocodesCountry, { concurrency: 2 })
  const origins = data.map(({ origins }) => origins)

  return flatten(origins)
}

async function getGeocodesCountry (destination) {
  return Object.assign({},
   destination,
  { origins: await getGeocodesCity(destination.origins, destination.countryName) })
}

async function getGeocodesCity (origins, country) {
  const cities = origins.map(city => Object.assign({}, city, { country, address: city.cityName }))

  return pMap(cities, getGeocodes, { concurrency: 2 })
}

async function getGeocodes (item) {
  const [ firstHit ] = await geocoder.geocode(item)
  return {
    location: item,
    coordinates: firstHit
  }
}

module.exports = {
  getDestinations,
  saveDestinations
}
