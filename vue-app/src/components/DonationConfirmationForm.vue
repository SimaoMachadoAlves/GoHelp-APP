<template>
  <b-container class="form-container">
    <h2>Doações de {{ selectedParticipant.nome }}</h2>
    <div v-if="selectedParticipant.doacoesLivros.length > 0">
      <h3>Livros doados:</h3>
      <DonationConfirmationTable
        :items="selectedParticipant.doacoesLivros"
        :fields="bookFields"
        @updateBookStatus="updateStatus"
        type="Livros"
      ></DonationConfirmationTable>
    </div>

    <div v-if="selectedParticipant.doacoesMateriais.length > 0">
      <h3>Materiais doados:</h3>
      <DonationConfirmationTable
        :items="selectedParticipant.doacoesMateriais"
        :fields="materialFields"
        @updateMaterialStatus="updateStatus"
        type="Materiais"
      ></DonationConfirmationTable>
    </div>

    <b-container class="button-container">
      <b-button
        @click="handleSubmit"
        variant="primary"
        class="submit-button form-button"
        >Submeter</b-button
      >
      <b-button
        @click="$emit('close')"
        variant="danger"
        class="cancel-button form-button"
        >Cancelar</b-button
      >
    </b-container>
  </b-container>
</template>
<script>
import DonationConfirmationTable from "./DonationConfirmationTable.vue";
export default {
  name: "DonationConfirmationForm",
  components: {
    DonationConfirmationTable,
  },
  data() {
    return {
      bookFields: [
        { key: "tituloLivro", label: "Título" },
        { key: "statusLivro", label: "Status" },
        { key: "show_details", label: "Detalhes" },
      ],
      materialFields: [
        { key: "descricaoMaterial", label: "Descrição" },
        { key: "statusMaterial", label: "Status" },
        { key: "show_details", label: "Detalhes" },
      ],
    };
  },
  props: {
    selectedParticipant: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateStatus({ item, previousStatus, type }) {
      if (type === "Livros") {
        const index = this.selectedParticipant.doacoesLivros.findIndex(
          (i) => i.tituloLivro === item.tituloLivro
        );
        if (index !== -1) {
          this.$set(this.selectedParticipant.doacoesLivros, index, item);
          this.saveChanges();
        }
      } else if (type === "Materiais") {
        const index = this.selectedParticipant.doacoesMateriais.findIndex(
          (i) => i.descricaoMaterial === item.descricaoMaterial
        );
        if (index !== -1) {
          this.$set(this.selectedParticipant.doacoesMateriais, index, item);
          this.saveChanges();
        }
      }
    },
    saveChanges() {
      this.$emit("save", this.selectedParticipant);
      console.log("Changes saved");
    },
    handleSubmit() {
      this.saveChanges();
      this.$emit("close");
    },
  },
};
</script>
<style>
.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  margin-bottom: 200px;
}
.button-container {
  display: flex;
  justify-content: center;
  gap: 1em;
}
.form-button {
  width: 100px;
}
</style>
