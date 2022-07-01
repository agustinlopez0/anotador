<template>
    <div class="modal fade" id="add" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-centered">
			<div class="modal-content">
			
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Nueva materia</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showAlert = false">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<form>
						<div class="row">
							<div class="col">
								<label class="col-form-label">Materia:*</label>
								<input type="text" class="form-control" v-model="name">
							</div>
						</div>
                        <div class="row">
							<div class="col">
								<label class="col-form-label">Horario:*</label>
								<input type="text" class="form-control" v-model="horarios">
							</div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="recipient-name" class="col-form-label">Plataforma:</label>
								<div class="input-group mb-3">
									<select class="custom-select" id="inputGroupSelect01" v-model="plataform">
										<option value="Comunidades">Comunidades</option>
										<option value="Classroom">Classroom</option>
									</select>
								</div>
                            </div>
							<div class="col">
								<label class="col-form-label">Link de la plataforma:</label>
								<input type="text" class="form-control" v-model="linkPlataform" :disabled="!plataform">
							</div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="recipient-name" class="col-form-label">Meetings:</label>
								<div class="input-group mb-3">
									<select class="custom-select" id="inputGroupSelect01" v-model="meet">
										<option value="Meet">Meet</option>
										<option value="Zoom">Zoom</option>
										<option value="Discord">Discord</option>
									</select>
								</div>
                            </div>
							<div class="col">
								<label class="col-form-label">Link de meeting:</label>
								<input type="text" class="form-control" v-model="linkMeet" :disabled="!meet">
							</div>
                        </div>
						<div class="alert alert-danger" role="alert" v-if="showAlert">
							Revise los campos del formulario, los marcados con asteriscos son obligatorios
						</div>
					</form>
				</div>
				
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" @click="showAlert = false" data-dismiss="modal">Cerrar</button>
					<button type="button" class="btn btn-primary" @click="validateForm()">Añadir</button>
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
            name: "",
            horarios: "",
            plataform: "",
            linkPlataform: "",
            meet: "",
            linkMeet:"",
            showAlert: false,
		}
	},
	async mounted(){
	},
	methods: {
		async validateForm(){	
			if(this.name){
				if(this.horarios){
					await this.createSubject()
					return true			
				}
			}
			this.showAlert = true
			return false
		},
		async createSubject(){
			let requestOptions = {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: this.name,
                    horarios: this.horarios,
                    plataform: this.plataform,
                    linkPlataform: this.linkPlataform,
                    meet: this.meet,
                    linkMeet: this.linkMeet,
				})
			}
			await fetch(`${baseURL}subjects`,requestOptions).then( x=>console.log(x))		
			location.reload()	
		}
	}
}

</script>

<style scoped>


</style>