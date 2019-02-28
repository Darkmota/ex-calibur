let mongoose = require('mongoose')
let config = require('../config/config')
let url = secret.local_test ? secret.local_address : secret.db_address

mongoose.connect(url)

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection succeed')
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection failed: ' + err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

/*
process.on('uncaughtException', (err) => {
  console.log('Caught exception: ' + err)
})
*/

module.exports = mongoose
