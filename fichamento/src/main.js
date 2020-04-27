import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from 'firebase'
import g from './../security'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: g.APIKEY,
  authDomain: "meu-fichamento.firebaseapp.com",
  databaseURL: "https://meu-fichamento.firebaseio.com",
  projectId: "meu-fichamento",
  storageBucket: "meu-fichamento.appspot.com",
  messagingSenderId: "144894167154",
  appId: "1:144894167154:web:3f764daf09f0e02e7b1aeb",
  measurementId: "G-GY0LDGNG0D"
};
firebase.initializeApp(firebaseConfig)
let app= '';
firebase.auth().onAuthStateChanged(()=>{
  console.log("Auth changed")
  if(!app){
    console.log("!app")
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
