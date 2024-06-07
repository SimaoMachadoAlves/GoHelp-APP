<template>
  <div class="end-event-page">
    <img alt="Danger image" src="../assets/danger-img.png" />
    <p>Tem a certeza que quer dar como concluído o evento?</p>
    <b-button variant="secondary" id="yesButton" @click.prevent="yes"
      >Sim</b-button
    >
    <br />
    <b-button variant="secondary" id="noButton" @click.prevent="no"
      >Não</b-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    yes() {
      const confirmation = window.confirm("Pretende mesmo encerrar o evento?");
      if (confirmation) {
        // Recupera o objeto do evento do sessionStorage
        const currentEvent = JSON.parse(
          sessionStorage.getItem("selectedEvent")
        );

        if (currentEvent) {
          // Atualiza o status do evento para "Concluído"
          currentEvent.status = "Concluido";

          // Atualiza a sessionStorage
          sessionStorage.setItem("selectedEvent", JSON.stringify(currentEvent));

          // Atualiza a localStorage
          const events = JSON.parse(localStorage.getItem("eventos")) || [];
          const eventIndex = events.findIndex(
            (event) => event.id === currentEvent.id
          );
          if (eventIndex !== -1) {
            events[eventIndex].status = "Concluido";
            localStorage.setItem("eventos", JSON.stringify(events));
          }

          alert("O evento foi terminado!");
          this.$router.push({ name: "homePage" }); // Redireciona para a página inicial ou outra página
        }
      } else return;
    },

    no() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.end-event-page {
  text-align: center;
  position: relative;
  min-height: 100vh;
  padding-top: 100px;
}
p {
  margin-top: 3rem;
  font-size: larger;
}

img {
  width: 40%;
  height: 40%;
}

#yesButton,
#noButton {
  width: 40%;
  height: 3rem;
  border-radius: 2rem;
}

#yesButton {
  margin-top: 3rem;
  background-color: #597081;
}

#noButton {
  margin-top: 2rem;
  background-color: white;
  color: #6c757d;
  border: 3px solid #6c757d;
}
</style>
