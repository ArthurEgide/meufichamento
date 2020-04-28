<template>
  <div class="home">
    <!-- Array de autores! [Ana, Bia, Carla]-->
    <div v-for="authors in this.library" v-bind:key="authors" v>
      
      <!-- Elementos AUTOR dos autores-->
      <div v-for="(author, kAuthor, iAuthor) in authors" v-bind:key="author">

        <!-- Array de LIVROS! [Ana, Bia, Carla]-->
        <div v-for="titles in author" v-bind:key="titles">

          <p class="author">{{Object.keys(authors)[iAuthor]}}</p>
          <!-- Elementos LIVRO dos LIVROS-->
          <div v-for="(title, kTitle, iTitle) in titles" v-bind:key="title">

            <p class="title">{{Object.keys(titles)[iTitle]}}</p>

            <!-- Array de EDIÇÕES! [Ana, Bia, Carla]-->
            <div v-for="editions in title" v-bind:key="editions">

              <!-- Elementos EDIÇÃO das EDIÇÕES-->  
              <div v-for="(edition, kEdition, iEdition) in editions" v-bind:key="edition">
                
                <p class="edition">{{Object.keys(editions)[iEdition]}}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <input type="button" value="Logout" @click="logout">
    <input type="button" value="Record a book" @click="goto('/register/book')">
  </div>
</template>



<script>
// @ is an alias to /src
import firebase from 'firebase'
import AuthorCard from './../components/AuthorCard.vue'
import g from './../../security'

export default {
  name: 'Home',
  components: {
    AuthorCard
  },
  data(){
    return {
      library : null,
      lib_authors: null
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
    goto: function(path){
      this.$router.replace(path)
    }
  },
  beforeCreate: function () {
    firebase.database().ref()
    .child("users")
    .child(firebase.auth().currentUser.uid)
    .child("library")
    .once("value")
    .then( data =>{
      console.log("Dados coletados com sucesso")
      console.log(data.val())
      this.library = data.val();
      this.lib_authors = Object.keys(data.val())
    } )
  },
}
</script>

<style scoped>
.author {
  background-color: darkcyan;
}

.title {
  background-color: dodgerblue;
}

.edition {
  background-color: blueviolet;
}

p {
  color: white;
}

</style>