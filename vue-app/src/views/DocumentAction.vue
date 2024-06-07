<template>
  <div class="document-action-page">
    <b-container>
      <br />
      <h1>Documentar Ação</h1>
      <br />
      <UploadFileBox></UploadFileBox>
      <br />
      <b-container id="green_container">
        <br />
        <b-button id="button" v-b-modal.modal-1>
          Adicionar comentários sobre o evento
        </b-button>

        <b-modal
          ref="modal"
          id="modal-1"
          title="Adicionar Comentários"
          hide-footer
          @hidden="clearComment"
        >
          <!-- Conteúdo do modal -->
          <p class="mb-4">Escreva os seus comentários aqui:</p>
          <textarea
            class="form-control"
            v-model="comment"
            rows="10"
            placeholder="Comentário"
          ></textarea>

          <div class="text-right mt-3">
            <b-button @click="save" class="save-button">Submeter</b-button>
          </div>
        </b-modal>
        <br />
      </b-container>
    </b-container>
  </div>
</template>

<script>
import UploadFileBox from "@/components/UploadFileBox.vue";

export default {
  components: {
    UploadFileBox,
  },
  data() {
    return {
      comment: "",
      selectedEvent: JSON.parse(sessionStorage.getItem("selectedEvent")),
    };
  },
  methods: {
    save() {
      // Adicionar o comentário à lista de comentários do evento selecionado
      this.selectedEvent.comentarios.push(this.comment);

      // Atualizar a sessionStorage com os dados modificados
      sessionStorage.setItem(
        "selectedEvent",
        JSON.stringify(this.selectedEvent)
      );

      // Fechar o modal
      this.$refs.modal.hide();
    },
    clearComment() {
      // Limpar o texto da textarea
      this.comment = "";
    },
  },
};
</script>

<style scoped>
.document-action-page {
  padding-top: 100px;
}
h1 {
  font-size: 2.75rem;
  font-weight: bold;
  margin-left: 0em;
}

#green_container {
  background-color: #41776c;
  text-align: center;
  border-radius: 2rem;
  margin: 0 auto; /* Centralizar horizontalmente */
}

#button {
  display: block;
  margin: 0 auto; /* Centralizar horizontalmente */
  background-color: #ffffff;
  border-color: #ffffff;
  color: #6c757d;
  border-radius: 2rem;
  font-weight: bold;
  font-size: 1rem;
  width: 80%; /* Defina a largura desejada */
  white-space: normal; /* Permitir que o texto quebre em várias linhas */
  word-wrap: break-word;
  padding-left: 2rem;
  padding-right: 2rem;
}

.save-button {
  background-color: #59708180;
  color: #6c757d;
  font-weight: bold;
  border: 0;
  border-radius: 2rem;
  width: 40%;
}

.form-control {
  background-color: #f0f8ff;
  border: 0.25em solid #6c757d;
  border-radius: 1rem;
}
</style>
