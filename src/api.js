import axios from 'axios';

export default {
  getServerNames: function(){
    return axios.get('/api/names')
    .then((response) => {
      return response.data;
    });
  },
  getServerData: function(){
    return axios.get('/api/data')
    .then((response) => {
      return response.data;
    });
  }
}
