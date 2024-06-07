<template>
  <div>
    <b-table striped hover :items="filteredMaterials" :fields="fields">
      <template #cell(statusMaterial)="data">
        <div>
          <b-form-checkbox
            :checked="data.item.statusMaterial === 'entregue'"
            @change="updateStatus(data.index)"
          ></b-form-checkbox>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "TableMaterialsDonations",

  data() {
    return {
      fields: [
        { key: "descricaoMaterial", label: "Descrição" },
        { key: "tipoMaterial", label: "Tipo" },
        { key: "quantidadeMaterial", label: "Qtd" },
        { key: "statusMaterial", label: "Status", sortable: false },
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
      const material = this.filteredMaterials[index];

      // Alterna entre "entregue" e "naoEntregue" ao clicar
      material.statusMaterial =
        material.statusMaterial === "naoEntregue" ? "entregue" : "naoEntregue";

      // Guarda o index do material desatualizado do evento da sessionStorage, usando a descrição do material
      this.event.inscricoes.forEach((inscricao) => {
        const outdatedMaterialIndex = inscricao.doacoesMateriais.findIndex(
          (doacaoMaterial) =>
            doacaoMaterial.descricaoMaterial === material.descricaoMaterial
        );

        // Substitui o material doado na lista do evento pelo material atualizado
        if (outdatedMaterialIndex !== -1) {
          inscricao.doacoesMateriais.splice(outdatedMaterialIndex, 1, material);
        }
      });

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

      // Notifica o componente pai ou outros componentes, se necessário
      this.$emit("donation-status-updated", material);
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
