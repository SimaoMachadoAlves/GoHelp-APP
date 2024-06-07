<template>
  <transition name="slide-up">
    <div class="drawer-backdrop" v-if="isOpen" @click="closeDrawer">
      <div class="drawer-content" @click.stop>
        <b-container fluid class="card-container">
          <b-row class="card-row">
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
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SlidingDrawerMenu",

  data() {
    return {
      menuItems: [
        {
          icon: "box-fill",
          text: "Materiais da Iniciativa",
          path: "/materials",
        },

        {
          icon: "book-fill",
          text: "Doações de Livros",
          path: "/bookdonation",
        },
        {
          icon: "tools",
          text: "Doações de Materiais",
          path: "/materialdonation",
        },

        { icon: "people-fill", text: "Participantes", path: "/participants" },
        {
          icon: "person-fill-gear",
          text: "Colaboradores",
          path: "/colaborators",
        },
        {
          icon: "film",
          text: "Documentar Ação",
          path: "/documentAction",
        },
        { icon: "hourglass-bottom", text: "Terminar Evento", path: "endevent" },
      ],
    };
  },

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    closeDrawer() {
      this.$emit("update:isOpen", false);
    },
    cardClicked(item) {
      if (this.$router.currentRoute.path !== item.path) {
        this.$router.push({ path: item.path });
      }
      this.$emit("update:isOpen", false);
    },
  },
};
</script>

<style scoped>
.drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.drawer-content {
  max-height: 95vh;
  overflow-y: auto;
  width: 100%;
  background: white;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-out;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  z-index: 3;
}

.card-container {
  padding-top: 1rem;
  top: 20%;
}

.card-row {
  margin-bottom: 6rem;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s;
}
.slide-up-enter, .slide-up-leave-to /* .slide-up-leave-active in <2.1.8 */ {
  transform: translateY(100%);
}

.menu-card {
  background-color: #41766d;
  color: white;
  border-radius: 1rem;
  padding: 1rem;
}

.menu-card:hover {
  background-color: rgb(4, 66, 51);
}

.bi {
  font-size: 2rem;
  margin-right: 1rem;
}
</style>
