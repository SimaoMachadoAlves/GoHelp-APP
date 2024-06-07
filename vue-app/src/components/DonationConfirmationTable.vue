<template>
  <b-container>
    <div v-if="type === 'Livros'">
      <b-table fixed hover :items="items" :fields="fields">
        <template #cell(statusLivro)="data">
          <div class="column-container">
            <b-form-checkbox
              class="status-checkbox"
              :checked="data.item.statusLivro === 'entregue'"
              @change="toggleBookStatus(data.item)"
            >
            </b-form-checkbox></div
        ></template>
        <template #cell(show_details)="row">
          <div class="column-container details-column">
            <i
              class="bi"
              :class="row.detailsShowing ? 'bi-chevron-up' : 'bi-chevron-down'"
              @click="row.toggleDetails"
              style="cursor: pointer"
            ></i>
          </div>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Autor da obra:</b></b-col>
              <b-col>{{ row.item.autorLivro }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Ano de publicação:</b></b-col
              >
              <b-col>{{ row.item.anoLivro }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Condição:</b></b-col>
              <b-col>{{ row.item.condicaoLivro }}</b-col>
            </b-row>
          </b-card>
        </template>
      </b-table>
    </div>

    <div v-if="type === 'Materiais'">
      <b-table fixed hover :items="items" :fields="fields">
        <template #cell(statusMaterial)="data">
          <div class="column-container">
            <b-form-checkbox
              class="status-checkbox"
              :checked="data.item.statusMaterial === 'entregue'"
              @change="toggleMaterialStatus(data.item)"
            >
            </b-form-checkbox></div
        ></template>
        <template #cell(show_details)="row">
          <div class="column-container details-column">
            <i
              class="bi"
              :class="row.detailsShowing ? 'bi-chevron-up' : 'bi-chevron-down'"
              @click="row.toggleDetails"
              style="cursor: pointer"
            ></i>
          </div>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Condição do Material:</b></b-col
              >
              <b-col>{{ row.item.condicaoMaterial }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Quantidade:</b></b-col>
              <b-col>{{ row.item.quantidadeMaterial }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"
                ><b>Tipo de Material:</b></b-col
              >
              <b-col>{{ row.item.tipoMaterial }}</b-col>
            </b-row>
          </b-card>
        </template></b-table
      >
    </div>
  </b-container>
</template>

<script>
export default {
  name: "DonationConfirmationTable",
  props: {
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleBookStatus(item) {
      const previousStatus = item.statusLivro;

      item.statusLivro =
        item.statusLivro === "entregue" ? "naoEntregue" : "entregue";
      console.log(previousStatus, item.statusLivro);
      this.$emit("updateBookStatus", { item, previousStatus, type: "Livros" });
    },
    toggleMaterialStatus(item) {
      const previousStatus = item.statusMaterial;
      item.statusMaterial =
        item.statusMaterial === "entregue" ? "naoEntregue" : "entregue";
      console.log(previousStatus, item.statusMaterial);
      this.$emit("updateMaterialStatus", {
        item,
        previousStatus,
        type: "Materiais",
      });
    },
  },
};
</script>

<style>
.details-column {
  width: 5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.column-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
