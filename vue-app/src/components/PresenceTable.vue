<template>
  <div>
    <b-table fixed striped hover :items="items" :fields="fields">
      <template #cell(email)="data">
        <div class="email-column">
          {{ data.value }}
        </div>
      </template>
      <template #cell(status)="data">
        <b-form-checkbox
          class="status-checkbox"
          :checked="data.item.status === 'presente'"
          @change="toggleStatus(data.item)"
        >
        </b-form-checkbox></template
    ></b-table>
  </div>
</template>

<script>
export default {
  name: "PresenceTable",
  props: {
    fields: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleStatus(item) {
      const previousStatus = item.status;
      item.status = item.status === "presente" ? "naoPresente" : "presente";
      this.$emit("updateStatus", { item, previousStatus });
    },
  },
};
</script>

<style scoped>
.status-checkbox {
  left: 50%;
}

.email-column {
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
