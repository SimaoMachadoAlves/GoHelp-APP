<template>
  <div>
    <b-navbar fixed="top">
      <b-container class="navbar-container">
        <div @click.prevent="returnHome" class="clickable-text">
          <!-- Use um div como wrapper clicável -->
          <h1>GoHelp</h1>
          <h2>ORGANIZAÇÃO DE EVENTOS CULTURAIS</h2>
        </div>
        <i class="bi bi-person-fill" @click.prevent="goToProfile"></i>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  beforeCreate() {
    document.body.style.backgroundColor = "#ffffff";
  },
  methods: {
    returnHome() {
      //Condição para prevenir erro do router de ir para a mesma página
      if (this.$router.currentRoute.name === "homePage") return;
      this.$router.push({ name: "homePage" });
    },
    goToProfile() {
      this.$router.push({ name: "profile" });
    },
  },
};
</script>

<style scoped>
.navbar-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 1em;
  padding-left: 1em;
  padding-right: 1em;
}
.fixed-top {
  z-index: 4;
  background-color: white;
}
#logo {
  width: 100px;
  height: 100px;
}
h1 {
  font-size: 1.5rem;
  color: #43766c;
  font-weight: bold;
}
h2 {
  font-size: 0.65rem;
  color: #5a6f80;
  font-weight: bold;
}
i {
  font-size: 2.1rem;
  color: #43766c;
}
</style>
