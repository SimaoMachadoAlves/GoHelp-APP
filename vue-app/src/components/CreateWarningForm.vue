<template>
  <div>
    <b-container v-if="show" class="form-container">
      <b-form @submit.prevent="onSubmit" class="popup-form">
        <h2>Publique um aviso</h2>
        <b-form-group
          id="input-group-1"
          label="Título:"
          label-for="input-titulo"
        >
          <b-form-input
            id="input-titulo"
            v-model="warning.titulo"
            placeholder="Atenção!"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Tipo:"
          label-for="dropwdown-tipo"
        >
          <b-dropdown
            id="dropdown-tipo"
            text="Tipo"
            class="m-md-2 w-100"
            menu-class="w-100"
            boundary="window"
            boundary-padding="5"
          >
            <b-dropdown-item
              v-for="(item, index) in warning.opcoes"
              :key="index"
              @click="warning.selectedOption = item"
            >
              {{ item }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Descrição:"
          label-for="textarea-descricao"
        >
          <b-form-textarea
            id="textarea-descricao"
            v-model="warning.descricao"
            placeholder="Descreva a situação"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-container class="button-container">
          <b-button
            type="submit"
            variant="primary"
            class="submit-button form-button"
            >Submeter</b-button
          >
          <b-button
            @click="closeForm"
            variant="danger"
            class="cancel-button form-button"
            >Cancelar</b-button
          >
        </b-container>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "CreateWarningForm",
  data() {
    return {
      warning: {
        titulo: "",
        descricao: "",
        opcoes: [
          "Ausência de Material",
          "Ausência de Pessoal",
          "Agressão Física",
          "Furto",
          "Outro",
        ],
        selectedOption: "",
      },
      show: false,
    };
  },
  created() {
    const warnings = JSON.parse(localStorage.getItem("warningsData")) || [];
  },
  methods: {
    onSubmit(event) {
      const warnings = JSON.parse(localStorage.getItem("warningsData")) || [];
      const user = JSON.parse(sessionStorage.getItem("loginApp"));
      const selectedEvent = JSON.parse(sessionStorage.getItem("selectedEvent"));
      const newWarning = {
        id: Date.now(),
        eventId: selectedEvent.id,
        titulo: this.warning.titulo,
        descricao: this.warning.descricao,
        selectedOption: this.warning.selectedOption,
        author: user.email,
      };
      warnings.push(newWarning);
      localStorage.setItem("warningsData", JSON.stringify(warnings));

      // Reload the page by navigating to the same route
      this.$router.push({ name: "event-page" });
    },

    closeForm() {
      this.show = false;
    },

    openForm() {
      this.show = true;
    },
  },
};
</script>

<style>
.form-container {
  width: 75%;
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 20px;
  border: 2px solid #00000015;
  border-radius: 20px;
  z-index: 4;
  overflow: visible;
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
