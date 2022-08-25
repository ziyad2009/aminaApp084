const axios =require('axios');
const { model, models } = require('mongoose');
const api =  axios.create({
    baseURL: ' http://34.200.104.211:3000',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
module.exports= api;