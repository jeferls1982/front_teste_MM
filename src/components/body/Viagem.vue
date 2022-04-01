<template>
  <div>
    <div>
      <div class="m-5 flex">
        <button
          @click="showAllViagens()"
          class="
            flex
            justify-between
            bg-gray-500
            pl-3
            pr-3
            pb-1
            pt-1
            rounded-xl
            text-gray-300
            hover:bg-gray-600
            shadow-md
          "
        >
          Viagens Cadastradas
          <total-viagem class="ml-5" />
        </button>
        
      </div>
      <div class="flex">
        <div
          v-if="aba_viagem"
          @click="clickAbaViagem()"
          class="mt-8 aba_viagem rounded-md shadow-sm hover:bg-gray-700"
        >
          VIAGENS
        </div>
        <div
          class="table-viagens rounded-md shadow-sm m-5 bg-gray-200 p-5"
          v-if="allViagens"
        >
          <h1 class="p-3 bg-gray-500 flex justify-between">
            <span>Viagens</span>
            <button
              @click="adicionar()"
              class="
                bg-green-700
                text-white
                pr-2
                pl-2
                rounded-full
                mr-2
                shadow-md
              "
            >
              +
            </button>
          </h1>
          <div v-if="showForm">
            <form-viagem @show_form="show_form" />
          </div>
          <table class="text-center text-gray-800 p-5">
            <tr class="bg-gray-700 p-2 rounded-md text-gray-200">
              <th class="w-40">Nome</th>
              <th v-if="details" class="w-40">Descrição</th>
              <th class="w-40">Origem</th>
              <th class="w-40">Data</th>
              <th v-if="details" class="w-20">Ações</th>
            </tr>
            <tr
              class="text-sm hover:bg-gray-400"
              v-for="item in getViagens"
              :key="item.id"
              
            >
              <td @click="show_viagem(item)">{{ item.nome }}</td>
              <td @click="show_viagem(item)" v-if="details">
                {{ item.descricao }}
              </td>
              <td @click="show_viagem(item)">{{ item.origem }}</td>
              <td @click="show_viagem(item)">{{ formatData(item.date) }}</td>
              <td v-if="details" class="flex justify-between">
                <button @click="excluir(item.id)" class="text-red-700">
                  X
                </button>
                <button class="text-blue-700">Editar</button>
              </td>
            </tr>
          </table>
        </div>

        <div v-if="showInfo">
          <show-viagem
            :id="id_viagem"
            @show_table="show_table"
            @show_info="show_info"
          />
        </div>

        <div v-if="forUser" class="flex">
          <div class="card rounded-md">
            <span class="card-header">
              <div class="flex justify-between bg-gray-500 p-2">
                <span>VIAGENS</span>
              </div>
            </span>

            <ul class="lista" v-for="item in getContatos" :key="item.id">
              <li @click="showModalInfo(item), show_viagem(item)">
                {{ item.nome }}
              </li>
            </ul>
          </div>
        </div>

        <div v-if="showItinerario">
          <itinerario
            :viagem="viagem"
            @fecha_itinerario="fecha_itinerario"
            :item="viagem"
          />
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<script>
import TotalViagem from "../global/TotalViagem.vue";
import ShowViagem from "./viagem/Show.vue";
import ListaContatos from "./viagem/ListaContatos.vue";
import FormViagem from "./viagem/Form.vue";
import itinerario from "./viagem/Itinerario.vue";

import moment from "moment";
export default {
  components: {
    TotalViagem,
    ShowViagem,
    ListaContatos,
    FormViagem,
    itinerario,
    
  },
  data() {
    return {
      item: null,
      viagem: null,
      forUser: false,
      allViagens: false,
      showInfo: false,
      id_viagem: null,
      showForm: false,
      showItinerario: false,
      details: true,
      aba_viagem: false,
    };
  },
  methods: {
    clickAbaViagem() {
      this.showForUser = false;
      this.aba_viagem = false;
      this.allViagens = true;
      this.details = true;
      this.showInfo = false;
      this.showItinerario = false;
    },
    showForUser() {
      this.forUser = true;
      this.allViagens = false;
    },
    show_viagem(item) {
      this.viagem = item
      this.showItinerario = true;
      this.details = false;
      this.$store.dispatch('itinerario',this.viagem.id);

      
    },
    showAllViagens() {
      this.allViagens = true;
      this.forUser = false;
      this.showForm = false;
      this.showInfo = false;
    },
    formatData(value) {
      return moment(String(value)).format("MM/DD/YYYY");
    },
    adicionar() {
      this.showInfo = false;
      this.showForm = true;
    },
    showModalInfo(item) {
      this.item = item;
      this.showForm = false;
      this.showInfo = true;
      this.id_viagem = item.id;
      this.$store.dispatch("viagens_contato", item.id);
    },
    show_info(i) {
      this.showInfo = i;
      this.details = true;
    },
    show_form(i) {
      this.$store.dispatch('load_contatos')
      this.showForm = i;
    },
    show_table(i, viagem) {
      this.viagem = viagem;
      this.allViagens = i;
      this.aba_viagem = true;
      this.showItinerario = true;
    },
    fecha_itinerario() {
      this.details = true
      this.showItinerario = false;
    },
    excluir(id) {
      this.details = true;
      this.$store.dispatch("delete_viagem", id);
      
    },
  },
  computed: {
    getContatos() {
      return this.$store.state.pessoas;
    },
    getViagens() {
      return this.$store.state.viagens;
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid grey;
  width: 10rem;
  margin: 2rem;
  box-shadow: 1px 1px 2px grey;
  font-size: 12px;
  padding: 10px;
}
.card-header {
  background-color: gray;
  color: white;
  font-weight: 600;
}
li {
  padding: 0 15px;
  width: 100%;
}
ul:hover {
  background-color: rgba(128, 128, 128, 0.15);
}
.table-viagens {
  border: 1px solid gray;
}
tr {
  border-bottom: 1px solid rgba(128, 128, 128, 0.37);
}
.aba_viagem {
  writing-mode: vertical-rl;
  text-orientation: upright;
  background-color: rgba(70, 70, 70, 0.472);
  color: white;
  margin: 5px;
  height: 50%;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;
}
</style>