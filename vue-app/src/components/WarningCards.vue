<template>
  <b-container fluid class="warning-cards-container">
    <b-row>
      <b-col
        lg="4"
        md="6"
        sm="12"
        v-for="(warning, index) in eventWarnings"
        :key="index"
        class="mb-2"
      >
        <b-card :title="warning.titulo" tag="article" class="mb-2">
          <b-card-text class="text-left">
            <strong>Tipo: </strong>{{ warning.selectedOption }}
            <br />
            <strong>Descrição: </strong>{{ warning.descricao }}
            <br />
            <strong>Autor: </strong>{{ warning.author }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "WarningCards",
  data() {
    return {
      eventWarnings: [],
      selectedEvent: null,
    };
  },
  created() {
    this.selectedEvent =
      JSON.parse(sessionStorage.getItem("selectedEvent")) || null;

    const warnings = JSON.parse(localStorage.getItem("warningsData")) || [];

    if (this.selectedEvent) {
      this.eventWarnings = warnings.filter(
        (warning) => warning.eventId === this.selectedEvent.id
      );
    }
  },
};
</script>

<style scoped>
.warning-cards-container {
  max-height: 75vh; /* Adjust the height as needed */
  overflow-y: auto;
  padding-right: 1rem; /* To avoid scrollbar overlapping content */
}
.mb-2 {
  border-radius: 1.5rem;
  text-align: center;
  color: #41776c;
  z-index: 2;
}

.text-left {
  color: #000000;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 7px solid #5a6f80;
  border-radius: 2rem;
}
</style>
