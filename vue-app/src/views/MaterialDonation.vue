<template>
  <div class="material-donation-page">
    <b-container>
      <h1>Doações de Materiais</h1>
      <SearchBar @queryUpdated="updateSearchQuery"></SearchBar>
      <div class="material-donations-container">
        <TableMaterialsDonations
          :filteredMaterials="filteredMaterialDonations"
        />
      </div>
      <br />
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import FooterNavigationBar from "@/components/FooterNavigationBar.vue";
import TableMaterialsDonations from "@/components/TableMaterialsDonations.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    Navbar,
    FooterNavigationBar,
    TableMaterialsDonations,
    SearchBar,
  },
  data() {
    return {
      searchQuery: "",
      materialDonations: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const eventData = sessionStorage.getItem("selectedEvent");
      if (eventData) {
        const selectedEvent = JSON.parse(eventData);
        if (selectedEvent && selectedEvent.inscricoes) {
          this.materialDonations = selectedEvent.inscricoes
            .flatMap((inscricao) => inscricao.doacoesMateriais || [])
            .filter((material) => material !== null);
        }
      }
    },
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
  },
  computed: {
    filteredMaterialDonations() {
      if (!this.searchQuery) {
        return this.materialDonations;
      }
      return this.materialDonations.filter((donation) =>
        Object.values(donation).some((val) =>
          String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
  },
};
</script>

<style>
.material-donations-container {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.material-donation-page {
  position: relative;
  min-height: 100vh;
  padding-top: 100px;
}
</style>
