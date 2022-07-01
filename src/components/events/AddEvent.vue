<template>
    <div class="modal fade" id="add" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-centered">
			<div class="modal-content">
			
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Nuevo evento</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showAlert = false">
					<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<form>
						<label for="recipient-name" class="col-form-label">Materia:</label>
									<div class="input-group mb-3">
										<select class="custom-select" id="inputGroupSelect01" v-model="subject_id">
											<option v-for="subject in subjects" :key="subject" :value="subject._id">{{subject.name}}</option>
										</select>
									</div>
						<div class="row">
							<div class="col">
								<label class="col-form-label">Título:</label>
								<input type="text" class="form-control" v-model="title">
							</div>
							<div class="col">
								<label class="col-form-label">Fecha:</label>
								<input type="date" class="form-control" v-model="date">
							</div>
						</div>

						<div class="form-group">
							<label for="message-text" class="col-form-label">Descripción:</label>
							<textarea class="form-control" id="message-text" v-model="desc"></textarea>
						</div>
						<div class="alert alert-danger" role="alert" v-if="showAlert">
							Revise los campos del formulario
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
			subjects: [],
			subject_id: "",
			title: "",
			date: "",
			desc: "",
			showAlert: false,
		}
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
			if(this.subject_id){
				if(this.title){
					if(this.desc){
						if(this.date){
							await this.createEvent()
							return true
						}
					}
				}
			}
			this.showAlert = true
			return false
		},
		async createEvent(){
			let requestOptions = {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"subject_id": this.subject_id,
					"title": this.title,
					"desc": this.desc,
					"date": this.date,
				})
			}
			await fetch(`${baseURL}events`,requestOptions).then( x=>console.log(x))		
			location.reload()	
		}
	}
}

</script>

<style scoped>


</style>