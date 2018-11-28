import Vue from 'vue'
import Router from 'vue-router'
import Registration from './views/Registration.vue'
import Schedule from './views/Schedule.vue'
import ConfirmRegistration from './views/ConfirmRegistration.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/schedule'
    },
    {
      path: '/registration/:id',
      name: 'registration',
      component: Registration
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/registration/:id/confirmation',
      name: 'confirmation',
      component: ConfirmRegistration
    }

  ]
})
