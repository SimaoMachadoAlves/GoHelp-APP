<template>
  <div>
    <b-input-group size="lg">
      <b-form-input
        placeholder="Procure..."
        v-model="searchQuery"
        @input="emitSearchQuery"
      ></b-form-input>
      <b-input-group-append>
        <b-input-group-text>
          <i class="bi bi-search"></i>
        </b-input-group-text>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>
<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    emitSearchQuery() {
      this.$emit("queryUpdated", this.searchQuery);
    },
  },
};
</script>
<style scoped>
.input-group-text {
  background-color: #43766c;
  border-color: #43766c;
}

.bi {
  color: #ffffff;
}
</style>
