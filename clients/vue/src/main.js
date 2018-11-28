import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosPlugin from './plugins/Axios.plugin';
import './styles/global.scss';


Vue.config.productionTip = false;

Vue.filter('dateOnly', function (value) {
  if (value.constructor === Date) {
    return value.getMonth() + '/' + value.getDate() + '/' + value.getFullYear();
  } else {
    console.trace(`WARNING: You are using the dateOnly filter but not passing it a date...`);
    console.dir(value);
    return value;
  }
});

Vue.filter('timeOnly', function (value) {
  if (value.constructor === Date) {
    return value.toLocaleTimeString();
  } else {
    console.trace(`WARNING: You are using the timeOnly filter but not passing it a date...`);
    console.dir(value);
    return value;
  }
});

Vue.use(AxiosPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
