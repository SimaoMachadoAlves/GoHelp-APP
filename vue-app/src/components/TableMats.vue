<template>
  <div>
    <b-table striped hover :items="filteredMaterials" :fields="fields">
      <template #cell(status)="data">
        <div>
          <b-form-checkbox
            :checked="data.item.status === 'confirmado'"
            @change="updateStatus(data.index)"
          >
          </b-form-checkbox>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "TableMats",
  data() {
    return {
      fields: [
        { key: "designacao", label: "Designação" },
        { key: "qtd", label: "Qtd" },
        { key: "status", label: "Status", sortable: false },
      ],
      event: "",
    };
  },

  props: {
    filteredMaterials: Array,
  },

  created() {
    // Recupera o objeto do evento do sessionStorage
    const currentEvent = JSON.parse(sessionStorage.getItem("selectedEvent"));

    // Verifica se o evento foi realmente recuperado do sessionStorage
    if (currentEvent) {
      this.event = currentEvent;
    }
  },
  methods: {
    updateStatus(index) {
      // Alterna entre "confirmado" e "naoConfirmado" ao clicar
      if (this.filteredMaterials[index].status === "naoConfirmado") {
        this.filteredMaterials[index].status = "confirmado";
      } else {
        this.filteredMaterials[index].status = "naoConfirmado";
      }

      // Guarda o index do material desatualizado do evento da sessionStorage, usando o ID
      const outdatedMaterialIndex = this.event.materiais.findIndex(
        (material) => material.id === this.filteredMaterials[index].id
      );

      /* Substitui o material na lista do evento pelo material2 atualizado
            splice (index, 1, objeto) 
        Neste caso, index = outdatedMaterialIndex, 1 significa "substituir" e objeto = this.filteredMaterials[index]
      */
      this.event.materiais.splice(
        outdatedMaterialIndex,
        1,
        this.filteredMaterials[index]
      );

      // Salva o objeto atualizado no sessionStorage
      sessionStorage.setItem("selectedEvent", JSON.stringify(this.event));

      // Atualiza a localStorage
      const events = JSON.parse(localStorage.getItem("eventos")) || [];
      const eventIndex = events.findIndex(
        (event) => event.id === this.event.id
      );
      if (eventIndex !== -1) {
        events[eventIndex] = this.event;
        localStorage.setItem("eventos", JSON.stringify(events));
      }
    },
  },
};
</script>

<style scoped>
.checkbox-checked {
  background-color: green !important;
}

.checkbox-checked
  .custom-control-input:checked
  ~ .custom-control-label::before {
  background-color: white !important;
}

div {
  margin-left: 0.5rem;
}
</style>
