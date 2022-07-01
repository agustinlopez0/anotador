<template>
  

  <section id="events" class="container">
    
    <div class="card-columns">
      
      <div class="card" v-if="!events.length">
        <div class="card-body d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
        </div>
      </div>

      <div  class="card" 
            v-else
            v-for="(event, i) in events" 
            :key="event" 
            :data-id="event.id"
            :class="{'text-white bg-danger': event.priority}">
        <div class="card-body">
          <h4 class="card-title">
            {{ event.subject_name }} 
            <small :class="{'text-muted': !event.priority}">
               ({{ event.date }})
            </small>
          </h4>
          <p class="card-text">
            <span style="font-weight:600; font-size:18px">{{ event.title.toUpperCase() }} - </span> {{ event.desc }}
          </p>
          
          <div id="cards-buttons" class="d-flex justify-content-between non-selectable">
            <div  id="set-priority" 
                  class="d-flex red-hover" 
                  :class="{'no-red-hover': event.priority}"
                  v-on:click="togglePriority(i)">
              <i class='bx bx-error-circle' ></i>
               <span>Destacar</span>
            </div>

            <div id="edit" class="d-flex" data-toggle="modal" data-target="#update" data-whatever="@mdo" @click="exportEvent(event)">
              <i class='bx bxs-edit' ></i>
              <span>Editar</span>
            </div>
          </div>
        </div>
        <div class="card-body link-plataform">
          <a :href="event.linkPlataform" class="btn btn-primary">Ir a {{event.plataform}}</a>
        </div>
      </div>

      <div class="card" id="card-plus">
        <div data-toggle="modal" data-target="#add" data-whatever="@mdo" class="card-body">
          <i class='bx bx-plus-circle'></i>
        </div>
      </div>
    </div>

    
    <AddEvent></AddEvent>
    <EditEvent :currentEvent="eventToExport"></EditEvent>
  </section>
</template>

<script>
import AddEvent from '@/components/events/AddEvent.vue'
import EditEvent from '@/components/events/EditEvent.vue'
const baseURL = 'https://server-anotador-agustinlopez0.vercel.app/api/'

export default {
  name: 'EventsCards',
  data(){
    return{
      events: [],
      eventToExport: {
        _id: "",
        subject_id: "",
        subject_name: "",
        title: "",
        date: "",
        desc: ""
      }
    }
  },
  async mounted(){
    this.events = await this.getDataEvents()
  },
  methods: {
    async getDataEvents(){
      let events = await fetch(`${baseURL}events`)
                      .then(x => x.json())
      let subjects = await fetch(`${baseURL}subjects`)
                      .then(x => x.json())
      events.forEach(element => {
        let subject = subjects.find(x => x._id == element.subject_id)
        element.subject_name = subject.name
        element.linkPlataform = subject.linkPlataform
        element.plataform = subject.plataform
      })
      return events.sort()
    },
    async togglePriority(i){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "priority": !this.events[i].priority,
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`https://server-anotador-agustinlopez0.vercel.app/api/events/${this.events[i]._id}`, requestOptions)
        .then(response => response.text())
    
    this.events[i].priority = !this.events[i].priority
    },
    exportEvent(x){
      this.eventToExport._id = x._id
      this.eventToExport.subject_id = x.subject_id
      this.eventToExport.subject_name = x.subject_name
      this.eventToExport.title = x.title
      this.eventToExport.date = x.date
      this.eventToExport.desc = x.desc
    }
  },
  components:{
    AddEvent,
    EditEvent
  }
}
</script>

<style scoped>
@media screen and (max-width: 400px) {
  #events{
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
  padding-top: 0px!important
}
</style>