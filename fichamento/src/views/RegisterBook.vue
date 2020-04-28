<template>
  <div class="home">
    <div>

      <p>Author</p>
      <input 
        type="text" 
        v-model="author"
        placeholder="Como está no livro!"
        >`
      <p>Title</p>
      <input 
        type="text" 
        v-model="title"
        placeholder="Como está no livro!"
        >
      <p>Edition</p>
      <input 
        type="text" 
        v-model="edition"
        placeholder="Como está no livro!"
        >
    </div>
    <br>
    <input type="button" value="Cancel" @click="home">  | 
    <input type="button" value="Register book" @click="registerBook">
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import g from './../../security'

export default {
  name: 'Register Book',
  components: {
  },
  data(){
    return {
      author: '',
      title: '',
      edition: ''
    };
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
    },

    registerBook: function(){
      console.log("Registrando livro")

      firebase.database().ref()
      .child("users")
      .child(firebase.auth().currentUser.uid)
      .child("library/")
      .child("authors/" + this.author)
      .child("titles/" + this.title)
      .child("editions/" + this.edition)
      .update({
        0 : "null"
      })
      .then(()=>{
        alert("Seu livro foi cadastrado com sucesso!")
        this.$router.push("/")
      })
      .catch( err =>{
        console.log("Error:", err)
        alert("Algo de errado não está certo!")
      })
    },

    home: function(){
      this.$router.go(-1)
    }
  }
}
</script>



<!--{
                    quotes : [
                      {
                        pag: 20,
                        note: "Essa página é gostosinha no azeite"
                      },
                      {
                        pag: 32,
                        note: "Hadouken"
                      },
                      {
                        pag: 50,
                        note: "Panelinha dos polefriends sdds"
                      },
                    ]
                  }