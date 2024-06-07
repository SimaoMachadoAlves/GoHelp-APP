<template>
  <div class="materials-page">
    <b-container>
      <h1>Materiais da Iniciativa</h1>
      <SearchBar @queryUpdated="updateSearchQuery"></SearchBar>
      <TableMats :filteredMaterials="filteredMaterials"></TableMats>
    </b-container>
  </div>
</template>

<script>
import TableMats from "@/components/TableMats.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    TableMats,
    SearchBar,
  },
  data() {
    return {
      searchQuery: "",
      materials: [],
    };
  },
  created() {
    // Recupera o objeto do evento do sessionStorage
    const currentEvent = JSON.parse(sessionStorage.getItem("selectedEvent"));

    // Verifica se o evento foi realmente recuperado do sessionStorage
    if (currentEvent) {
      // Atribui a lista de materiais à propriedade 'materials' do componente
      this.materials = currentEvent.materiais;
    }
  },
  computed: {
    filteredMaterials() {
      if (!this.searchQuery) {
        return this.materials;
      }
      return this.materials.filter((material) =>
        Object.values(material).some((val) =>
          String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
  },
  methods: {
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2em;
}
.materials-page {
  padding-top: 100px;
}
</style>
