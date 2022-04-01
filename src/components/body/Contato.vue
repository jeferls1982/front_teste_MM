<template>
  <div class="content flex flex-wrap">
    <div class="m-8">
      <div class="bg-gray-200 rounded-md w-64 drop-shadow-lg p-5">
        <span class="card-header">
          <span>CONTATOS</span>
          <total-contato />
          <button
            class="bg-green-700 text-white pl-2 pr-2 rounded-sm"
            @click="adicionar()"
          >
            +
          </button>
        </span>
        <ul class="lista" v-for="item in getContatos" :key="item.id">
          <li @click="show(item)">{{ item.nome }}</li>
        </ul>
      </div>
    </div>
    <!--------------------------------------------------------------------formulario -->
    <div class="flex flex-col">
      <div v-if="showForm" class="mt-8 rounded-md formulario p-2 w-64 h-56">
        <div class="card-header">
          <span class="font-semibold p-2 rounded-sm text-white">{{
            textForm
          }}</span>
          <button @click="showForm = false" class="">Fechar</button>
        </div>
        <div class="flex flex-col p-2">
          <div class="flex justify-between mt-3">
            <span>Nome :</span>
            <span><input class="" v-model="nome" type="text" /></span>
          </div>

          <div class="flex justify-between mt-3">
            <span>Fone:</span>
            <span><input class="" v-model="telefone" type="text" /></span>
          </div>

          <div class="flex justify-between mt-3">
            <span>Email:</span>
            <span><input class="" v-model="email" type="text" /></span>
          </div>

          <div class="flex justify-end">
            <button
              v-if="mostraBtnAdd"
              @click="store()"
              class="
                mt-5
                bg-green-800
                pr-3
                pl-3
                text-white
                rounded-sm
                hover:bg-green-900
              "
            >
              {{ textSubmit }}
            </button>
          </div>
        </div>
      </div>
      <div v-if="showInfo" class="">
        <div class="card card_info rounded-md">
          <span class="card-header">
            <span class="font-semibold p-2 rounded-sm text-white">{{
              contato.nome
            }}</span>
            <button
              @click="showInfo = false"
              class="bg-gray-500 pl-2 pr-2 rounded-md"
            >
              Fechar
            </button></span
          >
          <div class="flex flex-col justify-between">
            <div class="flex justify-between p-2">
              <span>Fone:</span>
              <span>{{ contato.telefone }}</span>
            </div>
            <div class="flex justify-between p-2">
              <span>E-mail:</span>
              <span>{{ contato.email }}</span>
            </div>
            <div class="flex justify-between p-2">
              <span>
                <button @click="editar(contato)" class="text-blue-600 p-3">
                  Editar
                </button>
              </span>
              <span>
                <button @click="excluir(contato.id)" class="text-red-600 p-3">
                  Excluir
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TotalContato from "../global/TotalContato.vue";
export default {
  components: {
    TotalContato,
  },
  data() {
    return {
      showInfo: false,
      showForm: false,
      contato: null,
      contato_id: null,
      nome: null,
      telefone: null,
      email: null,
      textForm: "Novo Contato",
      textSubmit: "Adicionar",
      update: false,
    };
  },
  methods: {
    show(item) {
      this.showInfo = true;
      this.showForm = false;
      this.contato = item;
    },
    adicionar() {
      this.update = false;
      this.showForm = true;
      this.showInfo = false;
      this.textForm = "Novo Contato";
      this.textSubmit = "Adicionar";
      this.clearForm();
    },
    store() {
      var data = {
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
      };
      if (!this.update) {
        this.$store.dispatch("store_contatos", data);
      } else {
        data.id = this.contato_id;
        this.$store.dispatch("update_contato", data);
      }
      this.clearForm();
    },
    clearForm() {
      (this.nome = null), (this.email = null), (this.telefone = null);
    },
    editar(contato) {
      this.showForm = true;
      this.showInfo = false;
      this.nome = contato.nome;
      this.telefone = contato.telefone;
      this.email = contato.email;
      this.textForm = "Editar Contato";
      this.textSubmit = "Alterar";
      this.update = true;
      this.contato_id = contato.id;
    },
    excluir(id) {
      this.$store.dispatch("destroy_contato", id);
      this.showInfo = false;
    },
  },
  computed: {
    getTotalContatos() {
      return this.$store.state.pessoas.length;
    },
    getContatos() {
      return this.$store.state.pessoas;
    },
    mostraBtnAdd() {
      if (this.nome && this.email && this.telefone) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid grey;
  width: 15rem;
  margin: 2rem;
  box-shadow: 1px 1px 2px grey;
  font-size: 12px;
  padding: 10px;
  height: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  padding: 0.7rem;
  background-color: gray;
  color: white;
  font-weight: 600;
}
li {
  padding: 0 15px;
}
ul:hover {
  background-color: rgba(128, 128, 128, 0.15);
}
.card_info {
  box-shadow: 2px 2px 2px grey;
}
.close_info {
  display: flex;
  justify-content: space-between;
}
.btn_close {
  padding: 2px 6px;
  background-color: rgb(66, 66, 66);
  color: white;
}
.formulario {
  border: 1px solid gray;
  font-size: 12px;
}
</style>