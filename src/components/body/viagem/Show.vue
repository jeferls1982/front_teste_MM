<template>
  <div class="card-info ml-5 mt-5 p-5 rounded-md h-90 w-80">
    <div class="flex justify-between bg-gray-600 text-white p-2 rounded-sm">
      <span>Info</span>
      <button @click="fechar()">Fechar</button>
    </div>
    <table>
      <tr
        class="hover:bg-gray-700 hover:text-white"
        @click="showItinerario(item)"
        v-for="item in getViagensContato"
        :key="item.id"
      >
        <td class="w-40">{{ item.nome }}</td>
        <td class="w-40">{{ item.origem }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    fechar() {
      this.$emit("show_info", false);
    },
    showItinerario(item) {        
      this.$emit('show_table', false,item);
      this.$store.dispatch("show_itinerario", item.id);
    },
    fecha_itinerario(){
        this.$emit('show_table', true);
    },
  },
  computed: {
    getViagensContato() {
      return this.$store.state.viagens_contato;
    },
  },
};
</script>

<style scoped>
.card-info {
  border: 1px solid gray;
  background-color: rgba(128, 128, 128, 0.157);
  font-size: 10px;
}
tr {
  border-bottom: 1px solid rgba(128, 128, 128, 0.191);
}
</style>