<template>
  <div class="home-page">
    <b-container>
      <h2 id="h2-prim">Bem-vindo à GoHelp</h2>
      <br />
      <h2 id="h2-secnd">Os seus Eventos:</h2>
      <br />
      <CardEvents></CardEvents>
    </b-container>
  </div>
</template>

<script>
import CardEvents from "@/components/CardEvents.vue";

export default {
  components: {
    CardEvents,
  },
  beforeCreate() {
    document.body.style.backgroundColor = "#FFFFFF";
  },
};
</script>

<style scoped>
.home-page {
  position: relative;
  min-height: 100vh;
  padding-top: 50px;
}
#h2-prim,
#h2-secnd {
  color: #6c757d;
}

#h2-prim {
  font-weight: bold;
  font-size: 1.75rem;
  text-align: center;
}

#h2-secnd {
  text-align: left;
  font-size: 1.5rem;
  padding-left: 2rem;
}
</style>
