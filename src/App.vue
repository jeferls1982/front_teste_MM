<template>  
  <div id="app" class="content">
    <meta charset="utf-8" />
    <div class="header">
      <leftbar class="left" />
    </div>
    <div class="corpo">
      <topbar class="top" />      
      <home class="conteudo" />
    </div>
  </div>
</template>

<script>
import Topbar from "./components/topbar/Topbar.vue";
import Leftbar from "./components/leftbar/Leftbar.vue";
import Home from "./components/body/Home.vue";
import SelectCidades from "./components/global/SelectCidades.vue"
export default {
  components: {
    Topbar,
    Leftbar,
    Home,
    SelectCidades
  },
  methods: {
    load_dados() {
      this.$store.dispatch("load_contatos");
      this.$store.dispatch("load_viagens");
      this.$store.dispatch("load_municipios");
    },
  },
  mounted() {
    this.load_dados();
  },
};
</script>

<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.content {
  display: flex;
  width: 100%;
  height: 100%;
}
.header {
  height: 100vh;
  background-color: rgb(58, 57, 57);
  flex: 1;
}
.corpo {
  flex: 4;
}

.top {
  background-color: rgb(197, 19, 19);
  width: 100%;
  height: 10vh;
}
.conteudo {
  height: 100%;
  width: 100%;
  background-color: rgba(224, 224, 222, 0.815);
}
</style>