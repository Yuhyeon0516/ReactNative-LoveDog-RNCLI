import axios from 'axios';

export function createAxiosInstance() {
  return axios.create({baseURL: 'https://dog.ceo/api'});
}
