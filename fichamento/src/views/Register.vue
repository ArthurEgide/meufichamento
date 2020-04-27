<template>
  <div>
    <form action="do_register" method="post" ref="form_register" id="form_register">
      <p>E-mail</p>
      <input 
        type="email" 
        v-model="email"
        >
      <p>Senha</p>
      <input 
      type="password" 
      v-model="password"
      >
      <p>Repita sua senha</p>
      <input 
      type="password" 
      v-model="repassword"
      >
    </form><br>
      <button @click="register">Registrar</button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: "register",
  data() {
    return {
      email: '',
      password: '',
      repassword: ''
    };
  },
  methods: {
    register: function() {
      if(this.password==this.repassword){
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then( 
          (user) =>{
            this.$router.replace("home")
          },
          (err) =>{
            alert("A unexpected thing happen")
            console.log("Error: " , err)
          }
        )
      }else{
        alert("The password's provided need to be the same")
      }

          
    }
  }
}
</script>