<template>
  <div id="app" :style="appStyle">
    <transition
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <Navbar v-if="!this.$route.meta.hideNavbars"></Navbar>
    </transition>
    <transition
      :name="transitionName"
      mode="out-in"
      @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @leave="handleLeave"
    >
      <router-view></router-view>
    </transition>
    <transition
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <FooterNavigationBar
        v-if="!this.$route.meta.hideNavbars"
      ></FooterNavigationBar>
    </transition>
  </div>
</template>

<script>
import FooterNavigationBar from "./components/FooterNavigationBar.vue";
import Navbar from "./components/Navbar.vue";
import anime from "animejs/lib/anime.es.js";
import {
  beforeEnter,
  enter,
  leave,
  getTransitionName,
} from "@/utils/transitions.js";

export default {
  name: "App",
  components: {
    Navbar,
    FooterNavigationBar,
  },
  data() {
    return {
      appStyle: {
        backgroundColor: "#fff",
      },
    };
  },
  mounted() {
    this.updateEventInLocalStorage();
    setInterval(this.updateEventInLocalStorage, 30000); // 30000 ms = 30 segundos
  },
  computed: {
    transitionName() {
      return getTransitionName(this.$route);
    },
  },
  methods: {
    updateEventInLocalStorage() {
      // Obter o evento selecionado da sessionStorage
      const selectedEvent = sessionStorage.getItem("selectedEvent");
      if (!selectedEvent) return;

      const eventObj = JSON.parse(selectedEvent);

      // Obter a lista de eventos da localStorage
      const eventos = JSON.parse(localStorage.getItem("eventos")) || [];

      // Encontrar o índice do evento que precisa ser atualizado
      const eventIndex = eventos.findIndex((event) => event.id === eventObj.id);

      if (eventIndex !== -1) {
        // Atualize o evento na lista
        eventos[eventIndex] = eventObj;

        // Salve a lista de volta na localStorage
        localStorage.setItem("eventos", JSON.stringify(eventos));
      }
    },
    handleBeforeEnter(el) {
      const transitionType = this.transitionName;
      beforeEnter(el, transitionType);
    },
    handleEnter(el, done) {
      const transitionType = this.transitionName;
      enter(el, done, transitionType);
      if (transitionType === "slide-up-home") {
        anime({
          targets: this.appStyle,
          backgroundColor: ["#43766c", "#ffffff"],
          duration: 500,
          easing: "easeInOutQuad",
        });
      }
    },
    handleLeave(el, done) {
      const transitionType = this.transitionName;
      leave(el, done, transitionType);
      if (transitionType === "slide-up-home") {
        anime({
          targets: this.appStyle,
          backgroundColor: ["#ffffff", "#43766c"],
          duration: 0,
          easing: "easeInOutQuad",
        });
      }
    },
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      anime({
        targets: el,
        opacity: [0, 1],
        duration: 300,
        easing: "easeInOutQuad",
        complete: done,
      });
    },
    leave(el, done) {
      anime({
        targets: el,
        opacity: [1, 0],
        duration: 300,
        easing: "easeInOutQuad",
        complete: done,
      });
    },
  },
};
</script>

<style scoped>
#app {
  overflow-x: hidden;
  background-color: #43766c;
  font-family: Raleway, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}
</style>
