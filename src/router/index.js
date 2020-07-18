import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import CategoryList from '../components/CategoryList.vue'
import CategoryEdit from '../components/CategoryEdit.vue'
import ItemList from '../components/ItemList.vue'
import ItemEdit from '../components/ItemEdit.vue'
import HeroList from '../components/HeroList.vue'
import HeroEdit from '../components/HeroEdit.vue'
import ArticleEdit from '../components/ArticleEdit.vue'
import ArticleList from '../components/ArticleList.vue'
import AdEdit from '../components/AdEdit.vue'
import AdList from '../components/AdList.vue'
import AdminUserEdit from '../components/AdminUserEdit.vue'
import AdminUserList from '../components/AdminUserList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/items/create',component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList},

      { path: '/heroes/list', component: HeroList },
      { path: '/heroes/create',component: HeroEdit },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },

      { path: '/articles/list', component: ArticleList },
      { path: '/articles/create',component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },

      { path: '/ads/list', component: AdList },
      { path: '/ads/create',component: AdEdit },
      { path: '/ads/edit/:id', component: AdEdit, props: true },

      { path: '/admin_users/list', component: AdminUserList },
      { path: '/admin_users/create',component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
