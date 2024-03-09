/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import https from 'https';
import config from '../config';

const { SERVER_PROTOCOL, AXIOS_BASE_HOST_PORT } = config[process.env.NODE_ENV || 'development'];
// console.log(`baseURL = ${SERVER_PROTOCOL}://${AXIOS_BASE_HOST_PORT}`);
// axios.defaults.baseURL = `${SERVER_PROTOCOL}://${AXIOS_BASE_HOST_PORT}`;
// axios.defaults.withCredentials = true;
// axios.defaults.httpsAgent = new https.Agent({
//   rejectUnauthorized: false,
// });

const axiosAPI = axios.create({
  baseURL: `${SERVER_PROTOCOL}://${AXIOS_BASE_HOST_PORT}`,
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  // paramsSerializer: (params) => {
  //   const str = new URLSearchParams(params).toString();
  //   return str;
  // },
});

export { axiosAPI };
