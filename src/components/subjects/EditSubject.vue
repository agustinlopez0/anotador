<template>
    <div class="modal fade" id="update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Editar materia</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showAlert = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

            <div class="modal-body">
					<form>
						<div class="row">
							<div class="col">
								<label class="col-form-label">Materia:*</label>
								<input type="text" class="form-control" @input="handleName" :value="currentSubject.name">
							</div>
						</div>
                        <div class="row">
							<div class="col">
								<label class="col-form-label">Horario:*</label>
								<input type="text" class="form-control" @input="handleHorarios" :value="currentSubject.horarios">
							</div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="recipient-name" class="col-form-label">Plataforma:</label>
								<div class="input-group mb-3">
									<select class="custom-select" id="inputGroupSelect01" @input="handlePlataform"> 
										<option :value="currentSubject.plataform">{{currentSubject.plataform}}</option>
                                        <option value="Comunidades">Comunidades</option>
										<option value="Classroom">Classroom</option>
									</select>
								</div>
                            </div>
							<div class="col">
								<label class="col-form-label">Link de la plataforma:</label>
								<input  type="text" 
                                        class="form-control" 
                                        :disabled="!currentSubject.plataform" 
                                        @input="handleLinkPlataform"
                                        :value="currentSubject.linkPlataform">
							</div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="recipient-name" class="col-form-label">Meetings:</label>
								<div class="input-group mb-3">
									<select class="custom-select" id="inputGroupSelect01" @input="handleMeet">
										<option :value="currentSubject.meet">{{currentSubject.meet}}</option>
										<option value="Meet">Meet</option>
										<option value="Zoom">Zoom</option>
										<option value="Discord">Discord</option>
									</select>
								</div>
                            </div>
							<div class="col">
								<label class="col-form-label">Link de meeting:</label>
								<input type="text" class="form-control" :disabled="!currentSubject.meet" @input="handleLinkMeet" :value="currentSubject.linkMeet">
							</div>
                        </div>
						<div class="alert alert-danger" role="alert" v-if="showAlert">
							Revise los campos del formulario, los marcados con asteriscos son obligatorios
						</div>
					</form>
          </div>
        
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showAlert = false" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary btn btn-danger" @click="deleteSubject()">Eliminar</button>
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
			showAlert: false
		}
	},
	props: {
		currentSubject: Object
	},
	async mounted(){
	},
	methods: {
		async validateForm(){	
			if(this.currentSubject.name){
				if(this.currentSubject.horarios){
					await this.updateSubject()
					return true			
				}
			}
			this.showAlert = true
			return false
		},
		async updateSubject(){
			let requestOptions = {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"name": this.currentSubject.name,
					"horarios": this.currentSubject.horarios,
					"plataform": this.currentSubject.plataform,
					"linkPlataform": this.currentSubject.linkPlataform,
					"meet": this.currentSubject.meet,
					"linkMeet": this.currentSubject.linkMeet,
				})
			}
			await fetch(`${baseURL}subjects/${this.currentSubject._id}`,requestOptions)

			location.reload()	
		},
		async deleteSubject(){
			await fetch(`${baseURL}subjects/${this.currentSubject._id}`,{method: 'DELETE'})
			location.reload()	
		},
		handleName(e) {
            this.currentSubject.name = e.target.value
        },
		handleHorarios(e) {
            this.currentSubject.horarios = e.target.value
        },
		handlePlataform(e) {
            this.currentSubject.plataform = e.target.value
        },
		handleLinkPlataform(e) {
            this.currentSubject.linkPlataform = e.target.value
        },
		handleMeet(e) {
            this.currentSubject.meet = e.target.value
        },
		handleLinkMeet(e) {
            this.currentSubject.linkMeet = e.target.value
        },
	},
}

</script>

<style scoped>


</style>