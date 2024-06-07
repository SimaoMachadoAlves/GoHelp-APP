<template>
  <div class="participants-page">
    <b-container>
      <h1>Participantes</h1>
      <SearchBar @queryUpdated="filterItems"></SearchBar>
      <PresenceTable
        :fields="fields"
        :items="filteredItems"
        @updateStatus="updateItemStatus"
      ></PresenceTable>
      <DonationConfirmationForm
        v-if="showDonationConfirmationForm"
        :selectedParticipant="selectedParticipant"
        @save="handleSaveChanges"
        @close="showDonationConfirmationForm = false"
      ></DonationConfirmationForm>
    </b-container>
  </div>
</template>
<script>
import SearchBar from "@/components/SearchBar.vue";
import PresenceTable from "@/components/PresenceTable.vue";
import DonationConfirmationForm from "@/components/DonationConfirmationForm.vue";

export default {
  components: {
    SearchBar,
    PresenceTable,
    DonationConfirmationForm,
  },
  data() {
    return {
      selectedEvent: {},
      fields: [
        { key: "nome", label: "Name" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status" },
      ],
      filteredItems: [],
      selectedParticipant: {},
      showDonationConfirmationForm: false,
    };
  },
  created() {
    this.getEventData();
  },
  methods: {
    getEventData() {
      const event = JSON.parse(sessionStorage.getItem("selectedEvent"));
      if (event) {
        this.selectedEvent = event;
        this.filteredItems = event.inscricoes;
      }
    },
    filterItems(query) {
      this.filteredItems = this.selectedEvent.inscricoes.filter((item) => {
        return Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        );
      });
    },
    updateItemStatus({ item, previousStatus }) {
      const index = this.selectedEvent.inscricoes.findIndex(
        (i) => i.email === item.email
      );
      if (index !== -1) {
        this.$set(this.selectedEvent.inscricoes, index, item);
        this.filteredItems = [...this.selectedEvent.inscricoes];
        sessionStorage.setItem(
          "selectedEvent",
          JSON.stringify(this.selectedEvent)
        );
      }
      if (item.status === "presente" && previousStatus === "naoPresente") {
        this.selectedParticipant = item;
        this.showDonationConfirmationForm = true;
      }
    },
    handleSaveChanges(updatedParticipant) {
      const index = this.selectedEvent.inscricoes.findIndex(
        (i) => i.email === updatedParticipant.email
      );
      if (index !== -1) {
        this.$set(this.selectedEvent.inscricoes, index, updatedParticipant);
        this.filteredItems = [...this.selectedEvent.inscricoes];
        sessionStorage.setItem(
          "selectedEvent",
          JSON.stringify(this.selectedEvent)
        );
      }
    },
  },
};
</script>
<style>
.participants-page {
  position: relative;
  min-height: 100vh;
  padding-top: 100px;
}
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-left: 0em;
}
.form-container {
  top: 50%;
  width: 95%;
  padding-bottom: 70px;
}
</style>
