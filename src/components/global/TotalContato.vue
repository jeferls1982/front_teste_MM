<template>
  <div class="bg-blue-700 text-white pl-2 pr-2 rounded-md">
      {{getTotalContatos}}
  </div>
</template>

<script>
export default {
  computed: {
    getTotalContatos() {
      return this.$store.state.pessoas.length;
    },   
  },
};
</script>

<style scoped>
</style>