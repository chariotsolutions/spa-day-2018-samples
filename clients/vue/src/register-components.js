import Vue from 'vue';

import Spinner from './components/Spinner.vue';

export default function registerComponents() {
  Vue.component('spinner', Spinner);
}
