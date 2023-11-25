import axios from 'axios';

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const api = axios.create({
     //baseURL: 'http://localhost:3000',
    baseURL: 'http://167.99.38.205:3000',
    //baseURL: 'https://thawing-river-38619.herokuapp.com',
});
//'http://167.99.38.205:3000'
// export const staticAddress = 'http://10.0.0.4:3333/static/'
//export const staticAddress = 'https://thawing-river-38619.herokuapp.com/static/'
export default api;