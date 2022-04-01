<template>
  <div class="leftbar">
    <span class="logo"><router-link to="/">Teste</router-link></span>
    <div class="lista_servicos">
      <ul>
        <router-link @click="loadContatos()" to="/contato"><li class="flex justify-between">Contatos <total-contato /></li></router-link>
        <router-link @click="loadViagens()" to="/viagem"><li class="flex justify-between">Viagens <total-viagem /></li></router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import TotalContato from "../global/TotalContato.vue";
import TotalViagem from "../global/TotalViagem.vue";
export default {
  components:{
    TotalContato,
    TotalViagem
  },
  methods: {
    loadContatos() {
      this.$store.dispatch("load_contatos");
    },
    loadViagens() {
      this.$store.dispatch("load_viagens");
    },
  }, 
};
</script>

<style scoped>
.leftbar {
  display: flex;
  flex-direction: column;
}
.logo {
  font-size: 1.5rem;
  height: 10vh;
  width: 100%;
  background-color: rgb(197, 19, 19);
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lista_servicos {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  color: white;
}
ul {
  width: 90%;
}
li {
  padding: 0.5rem;
}
ul :hover {
  background-color: rgba(255, 255, 255, 0.144);
}
</style>