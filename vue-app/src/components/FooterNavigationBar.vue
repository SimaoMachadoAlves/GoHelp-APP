<template>
  <div>
    <b-navbar
      fixed="bottom"
      class="mobile-footer-nav"
      type="light"
      variant="faded"
    >
      <b-container class="justify-content-around text-center">
        <b-nav-item @click.prevent="warningClick">
          <i class="bi bi-exclamation-triangle-fill"></i>
        </b-nav-item>
        <b-nav-item active @click.prevent="homeClick">
          <i class="bi bi-house-fill"></i>
        </b-nav-item>
        <b-nav-item @click.prevent="toggleDrawer">
          <i class="bi bi-clipboard-fill"></i>
        </b-nav-item>
      </b-container>
    </b-navbar>
    <SlidingDrawerMenu
      :isOpen="drawerOpen"
      @update:isOpen="drawerOpen = $event"
    />
  </div>
</template>

<script>
import SlidingDrawerMenu from "@/components/SlidingDrawerMenu.vue";

export default {
  name: "FooterNavigationBar",

  components: {
    SlidingDrawerMenu,
  },

  data() {
    return {
      drawerOpen: false,
      selectedOption: "home",
    };
  },
  methods: {
    warningClick() {
      this.drawerOpen = false;
      if (this.$router.currentRoute.name !== "warnings") {
        this.$router.push({ name: "warnings" });
      }
    },

    homeClick() {
      this.drawerOpen = false;
      if (this.$router.currentRoute.name !== "eventPage") {
        this.$router.push({ name: "eventPage" });
      }
    },

    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
  },

  watch: {},
};
</script>

<style scoped>
div {
  z-index: 4;
}
.mobile-footer-nav {
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.bi {
  font-size: 2em;
  color: #41766d;
}

li::marker {
  content: none;
}
</style>
