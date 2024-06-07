<template>
  <div>
    <b-table striped hover :items="filteredBooks" :fields="fields">
      <template #cell(statusLivro)="data">
        <div>
          <b-form-checkbox
            :checked="data.item.statusLivro === 'entregue'"
            @change="updateStatus(data.index)"
          ></b-form-checkbox>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "TableBookDonations",
  props: {
    filteredBooks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        { key: "tituloLivro", label: "Título" },
        { key: "autorLivro", label: "Autor" },
        { key: "anoLivro", label: "Ano" },
        { key: "statusLivro", label: "Status", sortable: false },
      ],
      bookDonations: [],
    };
  },
  watch: {
    filteredBooks: {
      immediate: true,
      handler(newVal) {
        this.bookDonations = newVal;
      },
    },
  },
  created() {
    this.loadBookDonations();
    console.log("Component created, bookDonations loaded:", this.bookDonations);
  },
  methods: {
    updateStatus(index) {
      const livro = this.bookDonations[index];
      livro.statusLivro =
        livro.statusLivro === "entregue" ? "naoEntregue" : "entregue";

      // Retrieve the full session storage object to update
      const selectedEvent = JSON.parse(sessionStorage.getItem("selectedEvent"));
      selectedEvent.inscricoes.forEach((inscricao) => {
        const foundIndex = inscricao.doacoesLivros.findIndex(
          (bd) => bd.tituloLivro === livro.tituloLivro
        );
        if (foundIndex !== -1) {
          inscricao.doacoesLivros[foundIndex] = livro;
        }
      });

      // Save the updated event back to session storage
      sessionStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));

      // Atualiza a localStorage
      const events = JSON.parse(localStorage.getItem("eventos")) || [];
      const eventIndex = events.findIndex(
        (event) => event.id === selectedEvent.id
      );
      if (eventIndex !== -1) {
        events[eventIndex] = selectedEvent;
        localStorage.setItem("eventos", JSON.stringify(events));
      }

      // Notify parent or other components if needed
      this.$emit("donation-status-updated", livro);
    },
  },
};
</script>

<style scoped>
/* Container adjustments for proper alignment */
.b-table td {
  display: flex;
  align-items: center; /* Vertically center content in the cell */
  justify-content: center; /* Horizontally center content in the cell */
}

/* Specific adjustments for checkbox to ensure it aligns nicely */
.b-form-checkbox {
  margin: 0; /* Remove default margins if necessary */
}

/* Adjust checkbox visuals when checked */
.b-form-checkbox:checked + .custom-control-label::before {
  background-color: green !important;
  border-color: green !important;
}

/* Additional styling for the label or other elements if needed */
.custom-control-label {
  margin-left: 0.5rem; /* Adjust based on your visual preference */
}
</style>
