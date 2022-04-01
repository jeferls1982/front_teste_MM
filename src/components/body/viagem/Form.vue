<template>
  <div class="form_viagem flex">
    <div class="flex justify-between mt-3 mb-3">
      <div>
        <span>Motorista</span>
        <span>
          <select class="ml-3" v-model="user_id" type="text">
            <option value="">Selecione...</option>
            <option :value="item.id" v-for="item in getContatos" :key="item.id">
              {{ item.nome }}
            </option>
          </select>
        </span>
      </div>
      <div class="">
        <span class="ml-3">Tipo</span>
        <select v-model="nome" id="">
          <option value="Trabalho">Trabalho</option>
          <option value="Passeio">Passeio</option>
        </select>
      </div>
      <div class="flex items-center">
        <span class="ml-3">Origem</span>
        <select-cidades class="ml-3" @setCidade="setCidade" />
      </div>
    </div>
  </div>
  <div class="form_viagem flex justify-between items-center mb-5">
    <div class="">
      <span class="ml-3">Descrição:</span>
      <input class="ml-3" v-model="descricao" type="text" />
    </div>

    <div class="">
      <span>Data: </span>
      <input class="ml-3" v-model="date" type="date" />
    </div>

    <div>
      <button
        @click="adicionar()"
        class="bg-green-700 text-white pr-2 pl-2 rounded-sm shadow-md"
      >
        Adicionar
      </button>
      <button @click="fechar()" class="bg-gray-700 text-white pl-2 pr-2 ml-3">
        Fechar
      </button>
    </div>
  </div>
</template>

<script>
import SelectContato from "./ListaContatos.vue";
import SelectCidades from "../../global/SelectCidades.vue";
export default {
  components: {
    SelectContato,
    SelectCidades,
  },
  props: ["id"],
  data() {
    return {
      busca: null,
      textForm: "Nova Viagem",
      nome: null,
      descricao: null,
      date: null,
      user_id: null,
      origem: null,
      latitude: null,
      longitude: null,
    };
  },
  methods: {
    setCidade(cidade) {
      this.origem = cidade.nome;
      this.latitude = cidade.latitude;
      this.longitude = cidade.longitude;
    },
    fechar() {
      this.$emit("show_form", false);
    },
    adicionar() {
      var data = {
        nome: this.nome,
        descricao: this.descricao,
        date: this.date,
        user_id: this.user_id,
        origem: this.origem,
        latitude: this.latitude,
        longitude: this.longitude,
      };

      this.$store.dispatch("store_viagem", data);
      this.$emit('show_form', false)
      
    },
  },
  computed: {
    getMunicipios() {
      return this.$store.state.municipios;
    },
    getContatos() {
      return this.$store.state.pessoas;
    },
  },
};
</script>

<style scoped>
.form_viagem {
  font-size: 12px;
}
</style>