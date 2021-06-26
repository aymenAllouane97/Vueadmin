// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';
import Toasted from 'vue-toasted';
import VueApexCharts from 'vue-apexcharts';

import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import Widget from './components/Widget/Widget';
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(Vuesax, {
  // options here
})
Vue.use(BootstrapVue);
Vue.use(VueTouch);
Vue.use(Trend);
Vue.component('Widget', Widget);
// Register components in your 'main.js'
Vue.component('calendar', Calendar)
Vue.component('date-picker', DatePicker)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyABZl6RjtFW_tQHVO5MP2qcKqnmMXaD6xI',
  },
});
Vue.component('apexchart', VueApexCharts);
Vue.mixin(layoutMixin);
Vue.use(Toasted, {duration: 10000});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
