import { createRouter, createWebHashHistory } from 'vue-router'
import store from "../store"
const routes = [
    {
      name: "HomePage",
      path: "/",
      component: () => import("@/views/Home.vue")
    },
    {
      name: "LoginPage",
      path: "/login",
      component: () => import("@/views/Login.vue")
    },
    {
      name: "RegisterPage",
      path: "/register",
      component: () => import("@/views/Register.vue")
    },
    {
      name: "NewItem",
      path: "/new",
      component: () => import("@/views/NewItem.vue")
    },
    {
      name: "Favorites",
      path: "/account",
      meta: {
        componentName: "appItemList"
      },
      component: () => import("@/views/Account.vue")
    },
    {
      name: "Likes",
      path: "/likes",
      meta: {
        componentName: "appItemList"
      },
      component: () => import("@/views/Account.vue")
    },
    {
      name: "Settings",
      path: "/settings",
      meta: {
        componentName: "userSettings"
      },
      component: () => import("@/views/Account.vue")
    }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {  //! login olmadan home routeunu engellemek ve login ekranında tutmak
  const authNeededRoutes = ["HomePage"]
  const authDontNeededRoutes = ["LoginPage", "RegisterPage"]
  const _isAuth = store.getters._isAuth
  if(authDontNeededRoutes.indexOf(to.name) > -1 && _isAuth) { //! Login olduysa LoginPage ve RegisterPage' e gitmesini engellemek
    next(false)
  }
  if(authNeededRoutes.indexOf(to.name) > - 1) {
    if(_isAuth) next()
    else next({ name : 'LoginPage'})
  } else next()
  // if(to.name === "HomePage" && _isAuth) {
  //   next()
  // }
}) 

export default router