<template>
  <div class="warnings-page">
    <b-container>
      <WarningCards ref="warningCards"></WarningCards>
    </b-container>
    <div class="add-button-container">
      <AddButton ref="addButton" @openForm="openWarningForm"></AddButton>
    </div>
    <CreateWarningForm ref="createWarningForm" />
  </div>
</template>
<script>
import AddButton from "@/components/AddButton.vue";
import CreateWarningForm from "@/components/CreateWarningForm.vue";
import WarningCards from "@/components/WarningCards.vue";
import anime from "animejs/lib/anime.es.js";

export default {
  components: {
    AddButton,
    WarningCards,
    CreateWarningForm,
  },
  mounted() {
    this.animateComponents();
  },
  methods: {
    animateComponents() {
      // Animate WarningCards if they exist
      if (this.$refs.warningCards) {
        anime({
          targets: this.$refs.warningCards.$el,
          translateY: [-50, 0],
          opacity: [0, 1],
          duration: 500,
          easing: "easeOutQuad",
          delay: 500,
        });
      }
      // Animate AddButton
      if (this.$refs.addButton) {
        anime({
          targets: this.$refs.addButton.$el,
          scale: [0, 1],
          opacity: [0, 1],
          duration: 400,
          easing: "easeOutQuad",
          delay: 400,
        });
      }
    },

    openWarningForm() {
      this.$refs.createWarningForm.openForm();
    },
  },
};
</script>
<style>
.warnings-page {
  position: relative;
  min-height: 100vh;
  padding-top: 100px;
}
.add-button-container {
  position: fixed; /* Position it fixed to ensure it stays in view */
  bottom: 4em; /* Adjust to your needs */
  right: 50%; /* Adjust to your needs */
  z-index: 3; /* Ensure it appears above other elements */
}
</style>
