import Home from "../src/components/body/Body.vue"
import Contato from "../src/components/body/Contato.vue"
import Viagem from "../src/components/body/Viagem.vue"

export default [
    { path: '/', component: Home },
    { path: '/contato', component: Contato },
    { path: '/viagem', component: Viagem },
]