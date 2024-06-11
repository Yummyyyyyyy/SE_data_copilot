// src/router/index.ts
 
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Database from '@/views/Database.vue';
import Login from '@/views/Login.vue';
import naturalSQL from '@/views/NautralSQL.vue';
import UploadFile from '@/views/UploadFile.vue';
import history from '@/views/History.vue';
import visualize from '@/views/Visualize.vue';

import navbarLayout from '@/layouts/navbarLayout.vue';
import emptyLayout from '@/layouts/emptyLayout.vue';


 
const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    component: emptyLayout,
    children:[
      {
        path:'',
        component:Login,
      },
    ]
  },
  
  {
    path:'/',
    component: navbarLayout,
    children:[
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/database',
        name: 'Database',
        component: Database,
      },
      {
        path: '/uploadfile',
        name: 'UploadFile',
        component: UploadFile,
      },
      {
        path: '/naturalsql',
        name: 'NaturalSQL',
        component: naturalSQL,

      },
      {
        path: '/history',
        name: 'History',
        component: history,

      },
      {
        path: '/visualize',
        name: 'Visualize',
        component: visualize,

      },
        
      
    ]
  }
];
 
const router = createRouter({
  history: createWebHistory(),
  routes,
});

 
export default router;

