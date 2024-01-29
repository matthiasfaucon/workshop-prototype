import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '@/views/ProductView.vue'
import ListProductView from '@/views/ListProductView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'ListProductView',
      component: ListProductView,
    },
    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductView,
      props: true,
    },
  ],
})

export default router
