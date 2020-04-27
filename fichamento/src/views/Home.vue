<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>ola mundooooooo</p>
    <button @click="logout">SAIR DISSO</button>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import g from './../../security'

export default {
  name: 'Home',
  components: {
  },
  data(){
    return {}
  },
  methods: {
    logout: function() {
      console.log("saindo!")
        firebase
        .auth()
        .signOut()
        .then( 
          () =>{
            console.log("Deslogado com sucesso")
            this.$router.replace("login")
          }
        )
    }
  }
}
</script>