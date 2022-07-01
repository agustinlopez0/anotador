<template>
    <div class="modal fade" id="update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar evento</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showAlert = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form>
                <label for="recipient-name" class="col-form-label">Materia:</label>
							<div class="input-group mb-3">
								<select class="custom-select" id="inputGroupSelect01" @input="handleSubjectId">
                                    <option selected :value="currentEvent.subject_id">{{currentEvent.subject_name}}</option>
									<option v-for="subject in subjects" :key="subject" :value="subject._id">{{subject.name}}</option>
								</select>
							</div>
                <div class="row">
                    <div class="col">
                        <label class="col-form-label">Título:</label>
                        <input type="text" class="form-control" :value="currentEvent.title" @input="handleTitle">
                    </div>
                    <div class="col">
                        <label class="col-form-label">Fecha:</label>
                        <input type="date" class="form-control" :value="currentEvent.date" @input="handleDate">
                    </div>
                </div>

              <div class="form-group">
                <label for="message-text" class="col-form-label">Descripción:</label>
                <textarea class="form-control" id="message-text" :value="currentEvent.desc" @input="handleDesc"></textarea>
              </div>
                <div class="alert alert-danger" role="alert" v-if="showAlert">
                    Revise los campos del formulario
                </div>
            </form>
          </div>
        
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showAlert = false" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary btn btn-danger" @click="deleteEvent()">Eliminar</button>
            <button type="button" class="btn btn-primary" @click="validateForm()">Actualizar</button>
          </div>          
        </div>
      </div>
    </div>
</template>

<script>
const baseURL = 'https://server-anotador-agustinlopez0.vercel.app/api/'

export default {
  name: 'EventsCards',
	data(){
		return{
			subjects: [],
			showAlert: false,
		}
	},
	props: {
		currentEvent: Object
	},
	async mounted(){
		this.subjects = await this.getSubjects()
	},
	methods: {
		async getSubjects(){
			let subjects = await fetch(`${baseURL}subjects`)
									.then(x => x.json())
			return subjects
		},
		async validateForm(){	
			if(this.currentEvent.subject_id){
				if(this.currentEvent.title){
					if(this.currentEvent.desc){
						if(this.currentEvent.date){
							await this.updateEvent()
							return true
						}
					}
				}
			}
			this.showAlert = true
			return false
		},
		async updateEvent(){
			let requestOptions = {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"subject_id": this.currentEvent.subject_id,
					"title": this.currentEvent.title,
					"desc": this.currentEvent.desc,
					"date": this.currentEvent.date,
				})
			}
			await fetch(`${baseURL}events/${this.currentEvent._id}`,requestOptions)

			location.reload()	
		},
		async deleteEvent(){
			await fetch(`${baseURL}events/${this.currentEvent._id}`,{method: 'DELETE'})
			location.reload()	
		},

		handleTitle(e) {
            this.currentEvent.title = e.target.value
        },
		handleSubjectId(e) {
            this.currentEvent.subject_id = e.target.value
        },
		handleDate(e) {
            this.currentEvent.date = e.target.value
        },
		handleDesc(e) {
            this.currentEvent.desc = e.target.value
        }
	},
}

</script>

<style scoped>


</style>