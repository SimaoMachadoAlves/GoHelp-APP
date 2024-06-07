<template>
  <b-container fluid>
    <b-row>
      <b-col
        lg="4"
        md="6"
        sm="12"
        v-for="event in userEvents"
        :key="event.id"
        class="mb-2"
      >
        <b-card
          :title="event.tituloEvento"
          :img-src="require('@/assets/' + event.imagemEvento)"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
        >
          <b-card-text class="text-left">
            <strong>Local: </strong>{{ event.localEvento }}
            <br />
            <strong>Descrição: </strong>{{ event.descricaoEvento }}
            <br />
            <strong>Duração: </strong>{{ event.duracaoEvento }}h
            <hr />
            <strong>Data: </strong>{{ formatarData(event.dataEvento) }}
          </b-card-text>

          <b-button class="cardButton" @click.prevent="buttonClick(event)"
            >Entrar</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "CardEvents",
  data() {
    return {
      userEvents: [],
    };
  },
  created() {
    // Obter os eventos da localStorage
    const events = JSON.parse(localStorage.getItem("eventos")) || [];
    const userData = JSON.parse(sessionStorage.getItem("loginApp")) || [];

    // Filtrar os eventos que têm o colaborador com email 'userData.email'
    this.userEvents = events.filter(
      (evento) =>
        evento.colaboradores.some(
          (colaborador) => colaborador.email === userData.email
        ) && evento.status === "a Realizar"
    );
  },
  methods: {
    buttonClick(evento) {
      const selectedEventData = {
        id: evento.id,
        tituloEvento: evento.tituloEvento,
        descricaoEvento: evento.descricaoEvento,
        localEvento: evento.localEvento,
        duracaoEvento: evento.duracaoEvento,
        tipo: evento.tipo,
        dataEvento: evento.dataEvento,
        imagemEvento: evento.imagemEvento,
        precoInscricaoEvento: evento.precoInscricaoEvento,
        inscricoes: evento.inscricoes,
        colaboradores: evento.colaboradores,
        materiais: evento.materiais,
        ficheiros: evento.ficheiros,
        comentarios: evento.comentarios,
        status: evento.status,
      };

      sessionStorage.setItem(
        "selectedEvent",
        JSON.stringify(selectedEventData)
      );

      this.$router.push({ name: "eventPage" });
    },
    formatarData(data) {
      const dataObj = new Date(data);
      return (
        dataObj.toLocaleDateString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        ", " +
        dataObj.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    },
  },
};
</script>

<style scoped>
.mb-2 {
  border-radius: 1.5rem;
  text-align: center;
  color: #41776c;
}

img.card-img-top {
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}

.text-left {
  color: #000000;
}

.cardButton {
  background-color: #5a6f80;
  width: 70%;
  border-radius: 2rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 7px solid #5a6f80;
  border-radius: 2rem;
}
</style>
