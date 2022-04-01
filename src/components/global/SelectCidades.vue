<template>
  <div>
    <select @change="escolhido()" v-model="cidade" id="">
      <option value="">Selecione</option>
      <option v-for="item in getCidades" :key="item.id">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cidade: null,
    };
  },
  components: {},

  computed: {
    getCidades() {
      return this.$store.state.cidades;
    },
  },
  methods: {
    escolhido() {
      var data = {
        nome: this.cidade,
        estado: this.$store.state.municipios[0][this.cidade],
        latitude: this.$store.state.municipios[1][this.cidade],
        longitude: this.$store.state.municipios[2][this.cidade],
      };
     
      this.$emit('setCidade', data)
    },
  },
};
</script>

<style  scoped>
</style>