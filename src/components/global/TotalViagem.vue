<template>
  <div class="bg-blue-700 text-white pl-2 pr-2 rounded-md">
      {{getTotalViagens}}
  </div>
</template>

<script>
export default {
  computed: {
    getTotalViagens() {
      return this.$store.state.viagens.length;
    },   
  },
};
</script>

<style scoped>
</style>