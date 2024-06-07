<template>
  <div class="center-container">
    <b-button pill id="add-button" @click.prevent="openForm"
      ><i class="bi bi-plus-lg"></i
    ></b-button>
  </div>
</template>

<script>
export default {
  name: "AddButton",
  methods: {
    openForm() {
      this.$emit("openForm");
    },
  },
};
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.5vh;
}
#add-button {
  position: fixed;
  bottom: 2em;
  width: 5em;
  height: 5em;
  padding: 18px 18px;
  border-radius: 60px;
  text-align: center;
}

.bi {
  font-size: 2rem;
}
</style>
