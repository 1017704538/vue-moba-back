import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import CreateCategory from '../components/CreateCategory.vue'
import CategoryList from '../components/CategoryList.vue'
import ItemsList from '../components/ItemsList.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/categories/create',
        component: CreateCategory
      },
      {
        path: '/categories/list',
        component: CategoryList 
      },
      {
        path: '/items/list',
        component: ItemsList
      }
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
