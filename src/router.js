import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './components/LoginView.vue';

import SwimmerList from './components/SwimmerList.vue'
import SwimmerDetail from './components/SwimmerDetail.vue';
import DateList from './components/DateList.vue'
import DateDetail from './components/DateDetail.vue'
import ClubList from './components/ClubList.vue';
import ClubDetail from './components/ClubDetail.vue';

import CategoryList from './components/CategoryList.vue';
import CategoryDetail from './components/CategoryDetail.vue';

import MarkList from './components/MarkList.vue';


import NotImplementedYet from './components/NotImplementedYet.vue'

const routes = [
  { path: '/', component: NotImplementedYet },
  { path: '/login', component: LoginView },
  { path: '/swimmerList', component: SwimmerList },  
  { path: '/swimmerDetail/new', name: 'SwimmerCreate', component: SwimmerDetail,},  
  { path: '/swimmerDetail/:id', name: 'SwimmerEdit', component: SwimmerDetail, props: true },
  { path: '/clubList', component: ClubList },
  { path: '/clubDetail/new', name: 'ClubCreate', component: ClubDetail,},
  { path: '/clubDetail/:id', component: ClubDetail, props: true },  
  { path: '/categoryList', component: CategoryList },
  { path: '/categoryDetail/new', name: 'CategoryCreate', component: CategoryDetail,},
  { path: '/categoryDetail/:id', component: CategoryDetail, props: true },  

  { path: '/markList', component: MarkList },

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


