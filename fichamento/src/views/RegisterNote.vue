<template>
  <div class="home">
    <div>
      <p>Page</p>
      <input 
        type="page" 
        v-model="page"
        >
      <p>Note</p>
      <input 
        type="text" 
        v-model="note"
        placeholder="Descorra aqui o que precisa dizer sobre"
        >
    </div>
    <br>
    <input type="button" value="Cancel" @click="home">  | 
    <input type="button" value="Save" @click="registerNote">
    <div>
      <!-- Array de notas! [40, 109, 201]-->
      <div v-for="note in this.notes" v-bind:key="note" v>

        <p> {{note}} </p>

      </div>    

      
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import g from './../../security'

export default {
  name: 'Register Note',
  components: {
  },
  data(){
    return {
      page: '',
      note: '',
      notes: null,
      notes_path : '' 
    };
  },
  methods: {
    registerNote: function(){
      console.log("Registrando nota")

      firebase.database().ref(this.notes_path)
      .update({
        [this.page] : this.note
      })
      .then(()=>{
        alert("Nota Salva!")
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
  },
  beforeMount: function () {
    console.log(this.notes)
    console.log(this.$router.history.current.params.oldQuotes)
    this.notes = this.$router.history.current.params.oldQuotes
    this.notes_path = this.$router.history.current.params.path
    console.log(this.notes)
    console.log(this.$router.history.current.params.path)
  }
  
}
</script>