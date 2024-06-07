import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import HomePage from "../views/HomePage.vue";
import EventPage from "../views/EventPage.vue";
import Profile from "../views/Profile.vue";
import Warnings from "../views/Warnings.vue";
import Materials from "../views/Materials.vue";
import DocumentAction from "../views/DocumentAction.vue";
import Participants from "../views/Participants.vue";
import Colaborators from "../views/Colaborators.vue";
import MaterialDonation from "../views/MaterialDonation.vue";
import BookDonation from "../views/BookDonation.vue";
import EndEvent from "../views/EndEvent.vue";
import { setPreviousRoute } from "@/utils/previousRoute";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginPage,
    meta: { hideNavbars: true, customTransition: "slide-up-home" },
  },
  {
    path: "/home-page",
    name: "homePage",
    component: HomePage,
    meta: { hideNavbars: true, customTransition: "slide-up-home" },
  },
  {
    path: "/event-page",
    name: "eventPage",
    component: EventPage,
    meta: { hideNavbars: false, customTransition: "slide-right" },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { hideNavbars: true, transition: "fade" },
  },
  {
    path: "/warnings",
    name: "warnings",
    component: Warnings,
    meta: { hideNavbars: false, transition: "slide-right" },
  },
  {
    path: "/documentAction",
    name: "documentAction",
    component: DocumentAction,
    meta: { hideNavbars: false, customTransition: "slide-left" },
  },
  {
    path: "/materials",
    name: "materials",
    component: Materials,
    meta: { hideNavbars: false, customTransition: "slide-left" },
  },
  {
    path: "/materialdonation",
    name: "materialdonation",
    component: MaterialDonation,
    meta: { hideNavbars: false, customTransition: "slide-left" },
  },
  {
    path: "/bookdonation",
    name: "bookdonation",
    component: BookDonation,
    meta: { hideNavbars: false, customTransition: "slide-left" },
  },
  {
    path: "/participants",
    name: "participants",
    component: Participants,
    meta: { hideNavbars: false, customTransition: "slide-left" },
  },
  {
    path: "/colaborators",
    name: "colaborators",
    component: Colaborators,
    meta: { hideNavbars: false, customTransition: "slide-left" },
  },
  {
    path: "/endevent",
    name: "endevent",
    component: EndEvent,
    meta: { hideNavbars: false, customTransition: "slide-left" },
  },
];

const clipboardPages = [
  "colaborators",
  "documentAction",
  "bookdonation",
  "materialdonation",
  "materials",
  "participants",
  "endevent",
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  setPreviousRoute(from);
  if (to.name === "homePage" && from.name !== "login") {
    to.meta.customTransition = "slide-down";
  } else if (from.name === "profile" || to.name === "profile") {
    to.meta.customTransition = "fade";
  } else if (from.name === "homePage" && to.name === "eventPage") {
    to.meta.customTransition = "slide-up";
  } else if (
    clipboardPages.includes(from.name) &&
    clipboardPages.includes(to.name)
  ) {
    to.meta.customTransition = "fade";
  } else if (
    !clipboardPages.includes(from.name) &&
    clipboardPages.includes(to.name)
  ) {
    to.meta.customTransition = "slide-left";
  } else if (
    clipboardPages.includes(from.name) &&
    !clipboardPages.includes(to.name)
  ) {
    to.meta.customTransition = "slide-right";
  } else if (to.name === "warnings") {
    to.meta.customTransition = "slide-right";
  } else if (from.name === "warnings" && to.name === "eventPage") {
    to.meta.customTransition = "slide-left";
  }
  next();
});

export default router;
