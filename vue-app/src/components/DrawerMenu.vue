<template>
  <div>
    <b-modal
      id="drawer-menu"
      size="lg"
      title="Drawer Menu"
      hide-footer
      hide-header
      :no-close-on-backdrop="true"
      v-model="isDrawerOpen"
      @hidden="emitCloseEvent"
    >
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-button variant="btn-primary" @click="emitCloseEvent"
          ><i class="bi bi-x-lg"></i
        ></b-button>
      </b-navbar>
      <b-container fluid>
        <b-row>
          <b-col
            cols="12"
            class="my-1"
            v-for="item in menuItems"
            :key="item.text"
          >
            <b-card
              no-body
              class="menu-card"
              @click.prevent="cardClicked(item)"
            >
              <b-card-body class="d-flex align-items-center">
                <i class="bi" :class="`bi-${item.icon}`"></i>
                <h5 class="mb-0 ml-3">{{ item.text }}</h5>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "DrawerMenu",

  data() {
    return {
      isDrawerOpen: false,
      menuItems: [
        { icon: "truck", text: "Materiais da Iniciativa", path: "/materiais" },
        { icon: "people", text: "Participantes", path: "/profile" },
        { icon: "upc-scan", text: "Registar Presenças" },
        { icon: "shuffle", text: "Trocas Efetuadas" },
      ],
    };
  },

  props: {
    isDrawerOpen: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    emitCloseEvent() {
      this.$emit("update:isDrawerOpen", false);
    },
    cardClicked(item) {
      this.$router.push({ path: item.path });
    },
  },
};
</script>

<style scoped>
.bg-light {
  background-color: #ffffff;
}
.modal-dialog {
  position: fixed;
  margin: 0;
  width: 100%;
  height: auto;
  bottom: 0;
  transform: translate(0, 100%);
  transition: transform 0.3s ease-out;
}
.modal-content {
  border: 0;
  border-radius: 0.5rem 0.5rem 0 0;
}

.menu-card {
  background-color: #41766d;
  color: white;
  border-radius: 1rem;
}

.menu-card:hover {
  background-color: rgb(4, 66, 51);
}

.bi {
  font-size: 2rem;
  margin-right: 1rem;
}
</style>
