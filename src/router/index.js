import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import sourceData from "@/data.json";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () =>
      import(
        /* webpackChunkName: "destination.show" */ "@/views/ShowDestView.vue"
      ),
    props: (route) => ({ id: parseInt(route.params.id) }),
    // in case of there's no the id
    // eslint-disable-next-line
    beforeEnter(to, from) {
      const exist = sourceData.destinations.find(
        (destination) => destination.id === parseInt(to.params.id)
      );
      if (!exist)
        return {
          name: "NotFound",
          //allows keeping the url while rendering a different page
          params: { pathMatch: to.path.split("/").slice(1) },
          query: to.query,
          hash: to.hash,
        };
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () =>
          import(
            /* webpackChunkName: "destination.show" */ "@/views/ShowExperience.vue"
          ),
        props: (route) => ({
          params: route.params,
          id: parseInt(route.params.id),
        }),
      },
    ],
  },
  {
    path: "/protected",
    name: "protected",
    component: () => import("@/views/ProtectedView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/invoices",
    name: "invoices",
    component: () => import("@/views/InvoicesView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  scrollBehavior(to, from, savedPosition) {
    //return {top: null, left: null, behavior: null}
    return savedPosition || { top: 0 };
  },
});
/* eslint-disable */
// for authorization purposes
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !window.user) {
    //need to login if not already login
    return { name: "login", query: { redirect: to.fullPath } };
  }
});
export default router;
