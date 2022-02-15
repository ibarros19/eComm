const axios = require('axios')
const api = axios.create({
    baseURL: 'http://localhost:3001/api/',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
})

module.exports = api