import axios from 'axios';

const api = axios.create({
  baseURL: 'https://flavioboviovt.pythonanywhere.com/api/v1',
});

export default api;