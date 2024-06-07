<template>
  <div class="login-page">
    <b-container>
      <img id="logo" alt="GoHelp logo" src="../assets/logo.png" />
      <h1>GoHelp</h1>
      <p>ORGANIZAÇÃO DE EVENTOS CULTURAIS</p>
      <br />
      <LoginBox></LoginBox>
    </b-container>
  </div>
</template>

<script>
import LoginBox from "@/components/LoginBox.vue";

export default {
  components: {
    LoginBox,
  },
  methods: {
    login() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
  padding-top: 100px;
  background-color: #43766c;
}
#logo {
  height: 50%;
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 2rem;
}
#card {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 20rem;
}
h1 {
  padding-top: 10%;
  color: white;
  font-weight: bold;
  text-align: center;
}
p {
  color: white;
  text-align: center;
}
#texto-card {
  color: black;
}
</style>
