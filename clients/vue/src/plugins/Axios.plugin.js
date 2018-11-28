import * as axios from 'axios';

// TODO - not safe for server rendering, but it'll do for our sample
const hostAndPort = `${window.location.protocol}://${window.location.hostname}${window.location.port ? ':'+window.location.port : ''}`;

const axiosInstance = axios.create({
  baseURL: hostAndPort + '/spaday/api/',
  timeout: 6000
});

/**
 * This plugin always exposes the `getAxios` method on Vue.
 */
const AxiosPlugin = {
  install: function(Vue) {
    Vue.getAxios = function() {
      return axiosInstance;
    }
  }
};

export default AxiosPlugin;