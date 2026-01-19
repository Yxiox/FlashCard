import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path:'/tuberculose',
      name:'Tuberculose',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Tuberculose'
      }
    },
    {
      path:'/malaria',
      name:'Malária',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Malária'
      }
    },
    {
      path:'/HIV',
      name:'HIV',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'HIV'
      }
    },
    {
      path:'/diabetes',
      name:'Diabetes',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Diabete'
      }
    },
    {
      path:'/hipertensao',
      name:'Hipertensão',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Hipertensão'
      }
    },
    {
      path:'/cancer',
      name:'Câncer',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Câncer'
      }
    },
    {
      path:'/alzheimer',
      name:'Alzheimer',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Alzheimer'
      }
    },
    {
      path:'/parkinson',
      name:'Parkinson',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Parkinson'
      }
    },
    {
      path:'/epilepsia',
      name:'Epilepsia',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Epilepsia'
      }
    },
    {
      path:'/asma',
      name:'Asma',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Asma'
      }
    },
    {
      path:'/pneumonia',
      name:'Pneumonia',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Pneumonia'
      }
    },
    {
      path:'/anemia',
      name:'Anemia',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Anemia'
      }
    },
    {
      path:'/leucemia',
      name:'Leucemia',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Leucemia'
      }
    },
    {
      path:'/endocrinas',
      name:'Endócrinas',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Endócrinas'
      }
    },
    {
      path:'/esquizofrenia',
      name:'Esquizofrenia',
      component: () => import('../components/FlashQuestion.vue'),
      props:{
        Nome: 'Esquizofrenia'
      }
    }
  ],
})

export default router
