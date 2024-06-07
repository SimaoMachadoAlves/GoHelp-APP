<template>
  <div>
    <b-navbar>
      <b-container class="navbar-container">
        <p>Seu Perfil</p>
        <img
          id="cross"
          src="../assets/x.png"
          alt="Exit icon"
          @click="crossClicked"
        />
      </b-container>
    </b-navbar>
    <b-container class="user-information-container">
      <img
        id="profile-image"
        src="../assets/profile_image.png"
        alt="Profile image"
      />
      <UserDataBox></UserDataBox>
    </b-container>
  </div>
</template>

<script>
import UserDataBox from "@/components/UserDataBox.vue";

export default {
  name: "Profile",
  components: {
    UserDataBox,
  },
  methods: {
    crossClicked() {
      this.$router.back();
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
.user-information-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 1em;
  padding-left: 1em;
  padding-right: 1em;
  gap: 1em;
}

p {
  color: #6c757d;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0;
}

#profile-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
