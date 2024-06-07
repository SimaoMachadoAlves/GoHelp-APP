<template>
  <div class="d-flex justify-content-center">
    <b-card :title="title" tag="article" class="mb-2 rounded card-custom">
      <b-card-text class="text-center">
        {{ current }}/{{ total }}
        <br />
        <b-progress
          :value="progress"
          height="1.75rem"
          :max="100"
          class="mt-2 rounded-pill custom-progress"
          striped
          :animated="true"
        >
          <b-progress-bar :value="progress">
            <span class="progress-text">{{ progress }}%</span>
          </b-progress-bar>
        </b-progress>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "CardEventInfos",
  props: {
    title: String,
    total: Number,
    current: Number,
  },
  computed: {
    progress() {
      return this.total > 0 ? Math.round((this.current / this.total) * 100) : 0;
    },
  },
};
</script>

<style scoped>
.mb-2 {
  margin-top: 2rem;
  width: 70%;
}
.card-custom {
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: none;
}
.custom-progress .progress-bar {
  background-color: #43766c;
}
.progress-text {
  font-size: 1rem; /* Increased font size for better visibility */
  color: white; /* Ensuring the text color remains white */
}
</style>





