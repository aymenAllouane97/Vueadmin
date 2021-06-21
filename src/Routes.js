import Vue from 'vue';
import Router from 'vue-router';
import auth from './middlewares/auth';
import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
// Core
import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';
import Accident from "./pages/Accidents/Accident";
import Agents from "./pages/Tables/Agents";
import Ambulances from "./pages/Tables/Ambulances";
import Hospitals from "./pages/Tables/Hospitals";
import HospitalsTras from "./pages/Hospitals/HospitalsTras";
import AmbulanceTras from "./pages/Ambulance/AmbulanceTras.vue";
Vue.use(Router);
function guardMyroute(to, from, next)
{
  var isAuthenticated= false;
//this is just an example. You will have to find a better or
// centralised way to handle you localstorage data handling
  if(localStorage.getItem('token'))

    isAuthenticated = true;
  else
    isAuthenticated= false;
  if(isAuthenticated)
  {
    next(); // allow to enter route
  }
  else
  {
    next('/login'); // go to '/login';
  }
}
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
          beforeEnter : guardMyroute,
        },
        {
          path: 'accidents',
          name: 'AccidentPage',
          component: Accident,

        },
        {
          path: 'hospitals/track',
          name: 'HospitalsTrackPage',
          component: HospitalsTras,

        },
        {
          path: 'ambulances/track',
          name: 'AmbulancessTrackPage',
          component: AmbulanceTras,

        },
        {
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
        },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
        },
        {
          path: 'callCenter/agents',
          name: 'Agents',
          component: Agents,
          beforeEnter : guardMyroute,
        },
        {
          path: 'callCenter/hospitals',
          name: 'Hospitals',
          component: Hospitals,
        beforeEnter : guardMyroute,
        },
        {
          path: 'callCenter/ambulances',
          name: 'Ambulances',
          component: Ambulances,
          beforeEnter : guardMyroute,
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
        },
        {
          path: 'components/charts',
          name: 'ChartsPage',
          component: ChartsPage,
        },
        {
          path: 'tables',
          name: 'TablesBasicPage',
          component: TablesBasicPage,
        },
        {
          path: 'components/maps',
          name: 'GoogleMapPage',
          component: GoogleMapPage,
        },
      ],
    },
  ],
});
