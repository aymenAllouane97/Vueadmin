<template>
  <div class="sidebar-wrapper">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <router-link v-if="role == 'manager'" to="/app/dashboard"><span class="primary-word"> Manager</span> <span class="secondary-word"> App</span></router-link>
        <router-link v-if="role == 'agent'" to="/app/dashboard"><span class="primary-word"> Agent</span> <span class="secondary-word"> App</span></router-link>
      </header>
      <h5 class="navTitle first">
        APP
      </h5>
      <ul class="nav">
        <NavLink
            :activeItem="activeItem"
            header="Dashboard"
            link="/app/dashboard"
            iconName="fa fa-home"
            index="dashboard"
            isHeader
        />


        <NavLink
            :activeItem="activeItem"
            header="Accidents"
            link="/app/accidents"
            iconName="fa-exclamation-triangle"
            index="accidents"
            isHeader
        /><NavLink
            :activeItem="activeItem"
            header="Ambulances"
            link="/app/ambulances/track"
            iconName="fa-ambulance"
            index="ambulancesTrack"
            isHeader
        /><NavLink
            :activeItem="activeItem"
            header="Hospitals"
            link="/app/hospitals/track"
            iconName="fa-hospital-o"
            index="hospitalsTrack"
            isHeader
        />

        <NavLink
            v-if="role == 'manager'"
            :activeItem="activeItem"
            header="Call Center"
            link="/app/callCenter"
            iconName="fa-volume-control-phone"
            index="callCenter"
            :childrenLinks="[
              { header: 'Agents', link: '/app/callCenter/agents' },
              { header: 'Hospitals', link: '/app/callCenter/hospitals' },
              { header: 'Ambulance', link: '/app/callCenter/ambulances' },
            ]"
        />
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';
import axios from 'axios';
export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      profile:null,
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'danger',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'primary',
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },

    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
  },
  created() {

    this.setActiveByRoute();

  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
      role: state => state.role
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
