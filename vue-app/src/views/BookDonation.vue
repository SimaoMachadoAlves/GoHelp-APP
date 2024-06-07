<template>
  <div class="book-donations-page">
    <b-container>
      <h1>Doações de Livros</h1>
      <SearchBar @queryUpdated="updateSearchQuery"></SearchBar>
      <div class="book-donations-container">
        <TableBookDonation :filteredBooks="filteredBookDonations" />
      </div>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import FooterNavigationBar from "@/components/FooterNavigationBar.vue";
import TableBookDonation from "@/components/TableBookDonation.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    Navbar,
    FooterNavigationBar,
    TableBookDonation,
    SearchBar,
  },
  data() {
    return {
      searchQuery: "",
      bookDonations: [],
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
          this.bookDonations = selectedEvent.inscricoes
            .flatMap((inscricao) => inscricao.doacoesLivros || [])
            .filter((livro) => livro !== null);
        }
      }
    },
    updateSearchQuery(query) {
      this.searchQuery = query;
    },
  },
  computed: {
    filteredBookDonations() {
      if (!this.searchQuery) {
        return this.bookDonations;
      }
      const filtered = this.bookDonations.filter((donation) =>
        Object.values(donation).some((val) =>
          String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
      return filtered;
    },
  },
  watch: {
    searchQuery(newVal, oldVal) {
      console.log(`Search query changed from "${oldVal}" to "${newVal}"`);
    },
    filteredBookDonations(newList) {
      console.log("Filtered books updated:", newList);
    },
  },
};
</script>

<style>
h1 {
  font-size: 2em;
}
.book-donations-container {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.book-donations-page {
  position: relative;
  min-height: 100vh;
  padding-top: 100px;
}
</style>

// Comentário para aparecer como uma change no GitHub apenas
