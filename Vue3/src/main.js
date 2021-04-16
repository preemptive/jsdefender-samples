import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createStore } from 'vuex'
import router from './router'
import App from './App.vue'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user: ''
    }
  },
  mutations: {
    addUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    setUser (context, payload) {
      context.commit("addUser", payload);
    }
  },
  getters: {
    getUser: state => {
      return state.user
    }
  }
})

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.use(store)
app.mount('#app')