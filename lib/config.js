const nconf = require('nconf')
  .env({
    separator: '__',
    lowerCase: true
  })
  .file({
    file: 'config.json',
    dir: '../',
    search: true
  })

nconf.defaults({
  port: 4004,
  environment: 'develop',
  here: {
    appid: '',
    appcode: ''
  }
})

module.exports = {
  port: nconf.get('port'),
  environment: nconf.get('environment'),
  here: nconf.get('here')
}
