const lowfareService = require('../services/lowfare')

async function getDestinations (req, res, next) {
  const data = await lowfareService.getDestinations()

  res.send(data)
}

async function saveDestinations (req, res, next) {
  const data = await lowfareService.saveDestinations()

  res.send(data)
}



module.exports = {
  getDestinations,
  saveDestinations
}