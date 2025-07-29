import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';

import SwimmerList from './views/SwimmerList.vue'
import SwimmerDetail from './modules/swimmer/SwimmerDetail.vue';
import DateList from './views/DateList.vue'
import DateDetail from './modules/date/DateDetail.vue'
import ClubList from './views/ClubList.vue';
import ClubDetail from './modules/club/ClubDetail.vue';

import CategoryList from './views/CategoryList.vue';
import CategoryDetail from './modules/category/CategoryDetail.vue';

import MarkList from './views/MarkList.vue';
import MarkDetail from './modules/mark/MarkDetail.vue';


import NotImplementedYet from './views/NotImplementedYet.vue'

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
  { path: '/markDetail/new', name: 'MarkCreate', component: MarkDetail,},
  { path: '/markDetail/:id', component: MarkDetail, props: true },  

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


