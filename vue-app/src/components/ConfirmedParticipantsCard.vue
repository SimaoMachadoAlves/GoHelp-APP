<template>
  <div>
    <b-container fluid class="main-container">
      <h1>Participantes Confirmados</h1>
      <p>
        <i class="bi bi-person-check"></i> {{ confirmedParticipants }}
        <i class="bi bi-slash-lg"></i>
        {{ totalParticipants }}
      </p>
      <b-progress
        :value="confirmedParticipants"
        :max="totalParticipants"
        class="wide-progress-bar"
        show-progress
        animated
      ></b-progress>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "ConfirmedParticipantsCard",
  data() {
    return {
      participantes: [],
    };
  },
  computed: {
    confirmedParticipants() {
      return this.participantes.filter(
        (individuo) => individuo.status === "confirmado"
      ).length;
    },
    totalParticipants() {
      return this.participantes.length;
    },
  },
  created() {
    this.loadParticipants();
  },
  methods: {
    loadParticipants() {
      const participantesData = localStorage.getItem("participantesData");
      if (participantesData) {
        this.participantes = JSON.parse(participantesData);
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  font-size: 2.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

p {
  font-size: 1.5rem;
  font-weight: normal;
}

.bi-person-check {
  font-size: 2.5rem;
}

.wide-progress-bar {
  width: 100%;
}
</style>
