<template>
  <div class="event-page">
    <h2>{{ this.eventTitle }}</h2>
    <CardEventInfos
      title="Participantes"
      :total="totalParticipants"
      :current="currentParticipants"
    />
    <CardEventInfos
      title="Materiais"
      :total="totalMaterials"
      :current="currentMaterials"
    />
    <CardEventInfos
      title="Materiais Doados"
      :total="totalMaterialsDonated"
      :current="currentMaterialsDonated"
    />
    <CardEventInfos
      title="Livros Doados"
      :total="totalBooksDonated"
      :current="currentBooksDonated"
    />
    <br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CardEventInfos from "@/components/CardEventInfos.vue";
import FooterNavigationBar from "@/components/FooterNavigationBar.vue";

export default {
  name: "EventPage",
  data() {
    return {
      eventTitle: "",
      totalParticipants: 0,
      currentParticipants: 0,
      totalMaterials: 0,
      currentMaterials: 0,
      totalMaterialsDonated: 0,
      currentMaterialsDonated: 0,
      totalBooksDonated: 0,
      currentBooksDonated: 0,
    };
  },
  components: {
    Navbar,
    CardEventInfos,
    FooterNavigationBar,
  },
  created() {
    // Obter o evento da sessionStorage
    const currentEvent = JSON.parse(sessionStorage.getItem("selectedEvent"));

    // Definir o título do evento
    this.eventTitle = currentEvent.tituloEvento;

    // Calcular os participantes
    this.totalParticipants = currentEvent.inscricoes.length;
    this.currentParticipants = currentEvent.inscricoes.filter(
      (inscricao) => inscricao.status === "presente"
    ).length;

    // Calcular os materiais
    this.totalMaterials = currentEvent.materiais.length;
    this.currentMaterials = currentEvent.materiais.filter(
      (material) => material.status === "confirmado"
    ).length;

    // Calcular os materiais doados
    let totalMaterialsDonated = 0;
    let currentMaterialsDonated = 0;

    // Calcular os livros doados
    let totalBooksDonated = 0;
    let currentBooksDonated = 0;

    currentEvent.inscricoes.forEach((inscricao) => {
      totalMaterialsDonated += inscricao.doacoesMateriais.length;
      currentMaterialsDonated += inscricao.doacoesMateriais.filter(
        (material) => material.statusMaterial === "entregue"
      ).length;

      totalBooksDonated += inscricao.doacoesLivros.length;
      currentBooksDonated += inscricao.doacoesLivros.filter(
        (livro) => livro.statusLivro === "entregue"
      ).length;
    });

    this.totalMaterialsDonated = totalMaterialsDonated;
    this.currentMaterialsDonated = currentMaterialsDonated;
    this.totalBooksDonated = totalBooksDonated;
    this.currentBooksDonated = currentBooksDonated;
  },
};
</script>

<style scoped>
div {
  text-align: center;
}
h2 {
  margin-top: 2rem;
  font-size: 2.5rem;
  font-weight: bold;
  color: #43766c;
}
.event-page {
  position: relative;
  min-height: 100vh;
  padding-top: 100px;
}
</style>
