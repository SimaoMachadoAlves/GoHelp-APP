<template>
  <div class="colaborators-page">
    <b-container>
      <h1>Colaboradores</h1>
      <SearchBar @queryUpdated="filterItems"></SearchBar>
      <PresenceTable :fields="fields" :items="filteredItems"></PresenceTable>
      <br />
    </b-container>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import PresenceTable from "@/components/PresenceTable.vue";

export default {
  components: {
    SearchBar,
    PresenceTable,
  },
  data() {
    return {
      searchQuery: "",
      filteredItems: [],
      selectedEvent: "",
      allColaborators: [], // Adicione esta linha
      fields: [
        { key: "nome", label: "Nome", sortable: true },
        { key: "email", label: "Email" },
      ],
    };
  },
  created() {
    this.getEventData();
  },
  methods: {
    getEventData() {
      const event = JSON.parse(sessionStorage.getItem("selectedEvent"));

      const colaboradoresORG =
        JSON.parse(localStorage.getItem("colaboradoresORG")) || [];

      if (event) {
        this.selectedEvent = event;

        // Filtrar e mapear os colaboradores do evento
        this.allColaborators = event.colaboradores.map((eventColab) => {
          const colabDetails = colaboradoresORG.find(
            (orgColab) => orgColab.emailColaborador === eventColab.email
          );
          return {
            nome: colabDetails ? colabDetails.nomeColaborador : "Desconhecido",
            email: eventColab.email,
          };
        });

        // Inicializar filteredItems com todos os colaboradores
        this.filteredItems = this.allColaborators;
      }
    },
    filterItems(query) {
      if (query) {
        this.filteredItems = this.allColaborators.filter((item) => {
          return Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(query.toLowerCase())
          );
        });
      } else {
        // Restaure todos os itens se a query estiver vazia
        this.filteredItems = this.allColaborators;
      }
    },
  },
};
</script>

<style scoped>
.colaborators-page {
  padding-top: 100px;
}
</style>
