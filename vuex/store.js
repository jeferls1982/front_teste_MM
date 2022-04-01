import { data } from 'autoprefixer';
import axios from 'axios';
import municipios from '../data/csvjson.json'


import { createStore } from 'vuex'

export default createStore({
    state: {
        pessoas: [],
        viagens: [],
        municipios: [],
        viagens_contato: [],
        itinerario: [],
        cidades: []
    },
    mutations: {
        //-----------------------------------------------------------------contatos
        LOAD_CONTATOS(state, contatos) {

            this.state.pessoas = contatos
        },

        //-----------------------------------------------------------------viagens
        LOAD_VIAGENS(state, viagens) {
            this.state.viagens = viagens
        },
        LOAD_VIAGENS_CONTATO(state, viagens_contato) {
            this.state.viagens_contato = viagens_contato
        },
        LOAD_ITINERARIO(state, itinerario) {

            this.state.itinerario = itinerario
        }
    },
    actions: {
        //-----------------------------------------------------------------contatos
        load_contatos(context) {
            axios.get("http://localhost:3001/contato").then(
                (response) => {
                    context.commit("LOAD_CONTATOS", response.data)
                }
            )
        },
        store_contatos(context, data) {
            axios.post("http://localhost:3001/contato", data).then((response) => {
                this.dispatch('load_contatos')
            }).catch(e => {
                console.log(e)
            })
        },
        update_contato(context, contato) {
            axios.put(`http://localhost:3001/contato/${contato.id}`, contato).then(response => {
                this.dispatch('load_contatos')
            }).catch(e => {
                console.log(e)
            })
        },
        destroy_contato(context, id) {


            axios.delete(`http://localhost:3001/contato/${id}`).then((response) => {
                this.dispatch('load_contatos')
            }).catch(e => {
                console.log(e)
            })

        },




        //-----------------------------------------------------------------viagens
        load_viagens(context) {
            axios.get("http://localhost:3001/viagem").then(
                (response) => {
                    context.commit("LOAD_VIAGENS", response.data)
                }
            )
        },
        viagens_contato(context, id) {
            axios.get(`http://localhost:3001/viagem/pessoa/${id}`).then(
                (response) => {
                    context.commit("LOAD_VIAGENS_CONTATO", response.data)
                }
            )
        },
        delete_viagem(context, id) {
            axios.delete(`http://localhost:3001/viagem/${id}`).then((response) => {
                this.dispatch('load_viagens')
            }).catch(e => {
                console.log(e)
            })
        },
        show_itinerario(context, id) {
            axios.get(`http://localhost:3001/viagem/itinerario/${id}`).then(
                (response) => {
                    context.commit("LOAD_ITINERARIO", response.data)
                }
            )
        },
        itinerario(context, id) {
            axios.get(`http://localhost:3001/viagem/itinerario/${id}`).then(
                (response) => {

                    context.commit("LOAD_ITINERARIO", response.data)

                }
            )
        },


        //@store
        store_viagem(context, data) {
            axios.post("http://localhost:3001/viagem", data).then((response) => {
                console.log(response)
                this.dispatch('load_viagens')
            }).catch(e => {
                console.log(e)
            })
        },
        //--------------------------------------------------------------------itinerarios

        store_itinerario(context, data) {
            axios.post("http://localhost:3001/itinerario", data).then((response) => {
                this.dispatch('show_itinerario', data.viagem_id)
            }).catch(e => {
                console.log(e)
            })
        },
        destroy_itinerario(context, item) {
            axios.delete(`http://localhost:3001/itinerario/${item.id}`).then((response) => {
                this.dispatch('show_itinerario', item.viagem_id)
            }).catch(e => {
                console.log(e)
            })
        },


        //-------------------------------------------------------------------municipios
        load_municipios(context) {
            municipios.forEach(element => {
                this.state.municipios.push(element)
            });
            var cidades = Object.keys(this.state.municipios[0])
            this.state.cidades = cidades.sort()
        }
    },
    getters: {

    }
})