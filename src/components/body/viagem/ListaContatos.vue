<template>
  <div>
      
      <select v-model="contato" type="text">
          <option value="">Selecione...</option>
          <option :value="item.id" v-for="item in getContatos" :key="item.id">
              {{ item.nome }}
          </option>
         
      </select>
  </div>
</template>

<script>
export default {
  computed: {
    getContatos() {
      return this.$store.state.pessoas;
    },
  },
};
</script>

<style scoped>
</style>