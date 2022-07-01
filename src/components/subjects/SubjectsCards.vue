<template>
  

  <section id="subjects" class="container">
    
    <div class="card-columns">
      
      <div class="card" v-if="!subjects.length">
        <div class="card-body d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
        </div>
      </div>

      <div  class="card" 
            v-else
            v-for="subject in subjects" 
            :key="subject" 
            :data-id="subject.id">
        <div class="card-body">
          <h4 class="card-title">
            {{ subject.name }} 
            <small class="text-muted">
                <br>
               ({{ subject.horarios }})
            </small>
          </h4>
          
          <div id="cards-buttons" class="d-flex justify-content-between non-selectable">
            <div id="edit" class="d-flex" data-toggle="modal" data-target="#update" data-whatever="@mdo" @click="exportSubject(subject)">
              <i class='bx bxs-edit' ></i>
              <span>Editar</span>
            </div>
          </div>
        </div>
        <div class="card-body link-plataform">
            <a :href="subject.linkPlataform" class="btn comunidades-button" v-if="subject.plataform.toLowerCase() == 'comunidades'">
                Ir a {{subject.plataform}}
            </a>
            <a :href="subject.linkPlataform" class="btn classroom-button" v-if="subject.plataform.toLowerCase() == 'classroom'">
                Ir a {{subject.plataform}}
            </a>
          <a :href="subject.linkMeet" class="btn discord-button" v-if="subject.meet.toLowerCase() == 'discord'">Ir a {{subject.meet}}</a>
          <a :href="subject.linkMeet" class="btn btn-primary" v-if="subject.meet.toLowerCase() == 'meet' || subject.meet.toLowerCase() == 'zoom'">Ir a {{subject.meet}}</a>
        </div>
      </div>

      <div class="card" id="card-plus">
        <div data-toggle="modal" data-target="#add" data-whatever="@mdo" class="card-body">
          <i class='bx bx-plus-circle'></i>
        </div>
      </div>
    </div>

    
    <AddSubject></AddSubject>
    <EditSubject :currentSubject="subjectToExport"></EditSubject>
  </section>
</template>

<script>
import AddSubject from '@/components/subjects/AddSubject.vue'
import EditSubject from '@/components/subjects/EditSubject.vue'
const baseURL = 'https://server-anotador-agustinlopez0.vercel.app/api/'

export default {
  name: 'SubjectsCards',
  data(){
    return{
      subjects: [],
      subjectToExport: {
        _id: "",
        name: "",
        plataform: "",
        linkPlataform: "",
        meet: "",
        linkMeet: "",
        horarios: ""
      }
    }
  },
  async mounted(){
    this.subjects = await this.getDataSubjects()
  },
  methods: {
    async getDataSubjects(){
      let subjects = await fetch(`${baseURL}subjects`)
                      .then(x => x.json())

      return subjects
    },
    exportSubject(x){
      this.subjectToExport._id = x._id
      this.subjectToExport.name = x.name
      this.subjectToExport.plataform = x.plataform
      this.subjectToExport.linkPlataform = x.linkPlataform
      this.subjectToExport.meet = x.meet
      this.subjectToExport.linkMeet = x.linkMeet
      this.subjectToExport.horarios = x.horarios
    }
  },
  components:{
    AddSubject,
    EditSubject
  }
}
</script>

<style scoped>
@media screen and (max-width: 400px) {
  #subjects{
    margin: auto 20px;
  } 
}

#set-priority, #edit{
  font-size: 15px;
  display: flex;
  align-items: center;
  transition: all .2s;
}

.red-hover:hover{
  color: rgb(255, 0, 0);
  cursor: pointer;
}
.no-red-hover:hover{
  color: rgb(237, 237, 237);
  cursor: pointer;
}
#edit:hover{
  cursor: pointer;
}
#card-plus{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}
#card-plus .card-body{
  transition: all .2s;
}

#card-plus .card-body:hover{
  cursor: pointer;
  font-size: 70px;
}
.non-selectable {
   -moz-user-select: none; 
   -webkit-user-select: none;
   -ms-user-select: none;
   user-select: none; 
}
.link-plataform{
  padding-top: 0px!important;
  display: flex;
  justify-content: space-between;
}
.comunidades-button{
    background-color: #a82582; 
    color: #fff
}
.classroom-button{
    background-color: #4bcc3a; 
    color: #fff
}
.discord-button{
    background-color: #7289da; 
    color: #fff
}
</style>