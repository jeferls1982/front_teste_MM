<template>
  <div>
    <div class="card-itinerario w-96 m-5 p-5 border-gray-500 rounded-md">
      <div class="bg-gray-500 text-white p-2 rounded-sm flex justify-between">
        <span>Viagem: {{ item.nome }}</span>
        <span>ITINERÁRIO</span>
        <button
          @click="show_form = !show_form"
          class="bg-green-700 text-white pl-2 pr-2 rounded-full"
        >
          +
        </button>
        <button @click="fecha_itinerario()">Fechar</button>
      </div>
      <div v-if="show_form">
        <div class="">
          <div class="flex justify-between mt-2">
            <span>Nome:</span>
            <select-cidades @setCidade="setCidade" />

            <span>UF</span>
            <input v-model="uf" type="text" size="2" />
          </div>
          <div class="flex justify-between mt-2">
            <span>Latitude</span>
            <input v-model="latitude" type="text" size="8" />
            <span>Longitude</span>
            <input v-model="longitude" type="text" size="8" />
            <button
              @click="adicionarCidade()"
              class="btn_add bg-green-700 text-white pl-2 pr-2 rounded-sm"
            >
              {{ textSubmit }}
            </button>
          </div>
        </div>
      </div>
      <table class="text-center mt-2">
        <tr>
          <th>ID</th>
          <th class="w-32">Cidade</th>
          <th>UF</th>
          <th class="w-20">Latitude</th>
          <th class="w-20">Longitude</th>
          <th></th>
        </tr>
        <tr v-for="item in getItinerario" :key="item.id">
          <td>{{ item.id }}</td>
          <td class="w-32">{{ item.cidade }}</td>
          <td>{{ item.estado }}</td>
          <td class="w-20">{{ item.latitude }}</td>
          <td class="w-20">{{ item.longitude }}</td>
          <td class="acoes flex justify-between items-center">
            <button
              @click="excluir(item)"
              class="bg-red-700 pl-1 pr-2 text-white rounded-sm"
            >
              X
            </button>
            <button
              @click="editar(item)"
              class="bg-blue-700 pl-1 pr-1 text-white rounded-sm"
            >
              Edit
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <distancias :viagem="viagem" />
    </div>
  </div>
</template>

<script>
import SelectCidades from "../../global/SelectCidades.vue";
import Distancias from "./Distancias.vue";
export default {
  components: {
    SelectCidades,
    Distancias,
  },
  props: ["item", "viagem"],
  data() {
    return {
      textSubmit: "Adicionar",
      viagem_id: null,
      update: false,
      show_form: false,
      cidade: null,
      uf: null,
      latitude: null,
      longitude: null,
    };
  },
  methods: {
    setCidade(cidade) {
      this.cidade = cidade.nome;
      this.uf = cidade.estado;
      this.latitude = cidade.latitude;
      this.longitude = cidade.longitude;
    },
    fecha_itinerario() {
      this.$emit("fecha_itinerario");
    },
    showForm() {
      this.show_form = true;
    },
    adicionarCidade() {
      this.textSubmit = "Adicionar";
      var data = {
        viagem_id: this.item.id,
        cidade: this.cidade,
        estado: this.uf,
        latitude: this.latitude,
        longitude: this.longitude,
      };
      this.$store.dispatch("store_itinerario", data);
      this.clearForm();
    },
    excluir(item) {
      this.$store.dispatch("destroy_itinerario", item);
    },
    editar(item) {
      this.textSubmit = "Editar";
      this.update = true;
      this.show_form = true;
      this.viagem_id = item.viagem_id;
      this.cidade = item.cidade;
      this.uf = item.estado;
      this.latitude = item.latitude;
      this.longitude = item.longitude;
    },
    clearForm() {
      this.viagem_id = null;
      this.show_form = false;
      this.cidade = null;
      this.uf = null;
      this.latitude = null;
      this.longitude = null;
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
.card-itinerario {
  border: 1px solid gray;
  font-size: 12px;
}
.btn_add {
  font-size: 8px;
}
.acoes {
  font-size: 10px;
}
</style>