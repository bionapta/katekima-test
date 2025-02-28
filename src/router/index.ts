import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BerryListView from '@/views/BerryListView.vue'
import BerryDetailView from '@/views/BerryDetailView.vue'
import ProductAddView from '@/views/ProductAddView.vue'
import ProductEditView from '@/views/ProductEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/berry-list',
      name: 'berry-list',
      component: BerryListView,
    },
    {
      path: '/berry-detail',
      name: 'berry-detail',
      component: BerryDetailView,
    },
    {
      path: '/berry-detail/:id',
      name: 'berry-detail-id',
      component: BerryDetailView,
    },
    {
      path: '/add-product',
      name: 'add-product',
      component: ProductAddView,
    },
    {
      path: '/edit-product/:id',
      name: 'edit-product',
      component: ProductEditView,
    },
  ],
})

export default router
