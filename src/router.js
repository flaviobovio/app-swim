import { createRouter, createWebHistory } from 'vue-router';
import SwimmerList from './components/SwimmerList.vue'
import SwimmerDetail from './components/SwimmerDetail.vue';
import DateList from './components/DateList.vue'
import DateDetail from './components/DateDetail.vue'
import NotImplementedYet from './components/NotImplementedYet.vue'

const routes = [
  { path: '/', component: NotImplementedYet },
  { path: '/swimmerList', component: SwimmerList },  
  { path: '/swimmerDetail/new', name: 'SwimmerCreate', component: SwimmerDetail,},  
  { path: '/swimmerDetail/:id', name: 'SwimmerEdit', component: SwimmerDetail, props: true },
  { path: '/clubs', component: NotImplementedYet },
  { path: '/categories', component: NotImplementedYet },
  { path: '/results', component: NotImplementedYet },    
  { path: '/dateList', component: DateList },      
  { path: '/dateDetail/new', name: 'DateCreate', component: DateDetail,},  
  { path: '/dateDetail/:id', component: DateDetail, props: true },
  { path: '/markList', component: NotImplementedYet },    



];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


