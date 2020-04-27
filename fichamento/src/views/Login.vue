<template>
  <div>
  <div>
    <form action="do_login" method="post" ref="form_login" id="form_login">
      <p>E-mail</p>
      <p>{{test}}</p>
      <input 
        type="email" 
        v-model="email"
        >
      <p>Senha</p>
      <input 
      type="password" 
      v-model="password"
      >
    </form><br>
      <button @click="login">Entrar</button>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import g from './../../security'

export default {
  name: "login",
  data() {
    return {
      email: '',
      password: '',
      test: g.TESTE
    };
  },
  methods: {
    login: function() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then( 
          (user) =>{
            console.log("Logado com sucesso")
            console.log(user.user)
            this.$router.replace("home")
          },
          (err) =>{
            alert("A unexpected thing happen")
            console.log("Error: " , err)
          }
        )
    }
  }
}
</script>