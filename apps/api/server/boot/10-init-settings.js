'use strict'
const config = require('config')
const log = require('@colmena/logger')

module.exports = function(app, cb) {
  // This is the array of Settings that will be created
  const systemSettings = [
    {
      system: true,
      type: 'string',
      key: 'nodeEnv',
      value: process.env.NODE_ENV || 'development',
    },
    {
      system: true,
      type: 'string',
      key: 'appName',
      value: 'Colmena',
    },
  ]

  // Check if there are user configured Settings
  if (config.has('settings')) {
    // Get the defined settings
    const settings = config.get('settings')

    // Loop over the settings
    Object.keys(settings).forEach(key => {
      const value = settings[key]

      const setting = {
        key,
        value,
        system: true,
        type: typeof value,
      }
      systemSettings.push(setting)
    })
  }

  return app.models.Setting
    .destroyAll({
      system: true,
    })
    .then(res => log.info(`System Settings: ${res.count} removed`))
    .then(() => app.models.Setting.create(systemSettings))
    .then(res => log.info(`System Settings: ${res.length} added`))
    .asCallback(cb)

}
