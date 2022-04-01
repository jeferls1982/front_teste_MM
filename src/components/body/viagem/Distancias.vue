<template>
  <div>
    <div class="flex justify-center">
      <button @click="getDistancia()" class="bg-blue-600 text-white w-40 rounded-sm">
        Calcular Distâncias
      </button>
    </div>
    <div class="calculo m-5 flex flex-col p-4">
      <div class="flex w-48 justify-between bg-gray-600 text-white p-2">
        <span>{{ viagem.origem }}</span>   
        <span>Ofigem 0Km</span>    
      </div>

      <span v-for="item in getItinerario" :key="item.id">
        <div v-if="calcula_distancias" class="flex w-48 justify-between p-2">
          <span>{{ item.cidade }}</span>
          <span>{{ getDistancia(viagem, item) }}Km</span>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { getDistance } from "geolib";
export default {
  props: ["viagem"],
  data() {
    return {
      calcula_distancias: false,
      item: null,
    };
  },
  methods: {
    getDistancia(viagem, item) {
      this.calcula_distancias = true;
      console.log(viagem);
      console.log(item);
      var a = getDistance(
        { latitude: viagem.latitude, longitude: viagem.longitude },
        { latitude: item.latitude, longitude: item.longitude }
      );
      return a / 1000;
    },
  },

  computed: {
    getItinerario() {
      return this.$store.state.itinerario;
    },
  },
};
</script>

<style scoped>

.calculo{
    font-size: 10px;
}
</style>