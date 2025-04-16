import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://portfolio-webcomics-back-production.up.railway.app';

console.log('BASE URL utilisée par Axios:', baseURL); // 🔍

const API = axios.create({ baseURL });


export default API;
