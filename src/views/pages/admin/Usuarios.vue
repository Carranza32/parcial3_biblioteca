<template>
    <div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="Agregar" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
						</div>
                    </template>

                    <template v-slot:end>
                        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

				<DataTable
                    ref="dt"
                    :value="users"
                    v-model:selection="selectedUsers"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Usuarios</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <Column field="nombre" header="Nombres" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">nombre</span>
                            {{ slotProps.data.nombre }} {{ slotProps.data.apellido }}
                        </template>
                    </Column>
                    <Column field="email" header="Correo" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">email</span>
                            {{ slotProps.data.email }}
                        </template>
                    </Column>
                    <Column field="dui" header="DUI" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">dui</span>
                            {{ slotProps.data.dui }}
                        </template>
                    </Column>
                    <Column field="direccion" header="Direccion" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">direccion</span>
                            {{ slotProps.data.direccion }}
                        </template>
                    </Column>
                    <Column field="telefono" header="Telefono" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">telefono</span>
                            {{ slotProps.data.telefono }}
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editItem(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteItem(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

				<Dialog v-model:visible="createDialog" :style="{ width: '450px' }" header="Crear nuevo usuario" :modal="true" class="p-fluid">
					<Message severity="error" :closable="false" icon="" v-show="errors?.length > 0">
						<ul>
							<li v-for="error in errors" :key="error">
								{{ error }}
							</li>
						</ul>
					</Message>

                    <div class="field">
                        <label for="nombre">Nombres</label>
                        <InputText id="nombre" v-model.trim="user.nombre" required="true" autofocus :class="{ 'p-invalid': submitted && !user.nombre }" />
                        <small class="p-invalid" v-if="submitted && !user.nombre">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="apellido">Apellidos</label>
                        <InputText id="apellido" v-model.trim="user.apellido" required="true" autofocus :class="{ 'p-invalid': submitted && !user.apellido }" />
                        <small class="p-invalid" v-if="submitted && !user.apellido">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="email">Email</label>
                        <InputText id="email" v-model.trim="user.email" required="true" autofocus :class="{ 'p-invalid': submitted && !user.email }" />
                        <small class="p-invalid" v-if="submitted && !user.email">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="dui">DUI</label>
                        <InputText id="dui" v-model.trim="user.dui" required="true" autofocus :class="{ 'p-invalid': submitted && !user.dui }" />
                        <small class="p-invalid" v-if="submitted && !user.dui">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="direccion">Direccion</label>
                        <InputText id="direccion" v-model.trim="user.direccion" required="true" autofocus :class="{ 'p-invalid': submitted && !user.direccion }" />
                        <small class="p-invalid" v-if="submitted && !user.direccion">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="telefono">Telefono</label>
                        <InputText id="telefono" v-model.trim="user.telefono" required="true" autofocus :class="{ 'p-invalid': submitted && !user.telefono }" />
                        <small class="p-invalid" v-if="submitted && !user.telefono">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="password">Contrasena</label>
                        <InputText id="password" v-model.trim="user.password" required="true" autofocus :class="{ 'p-invalid': submitted && !user.password }" />
                        <small class="p-invalid" v-if="submitted && !user.password">Name is required.</small>
                    </div>

                    <!-- <div class="field">
                        <label class="mb-3">Category</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div> -->

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveItem" />
                    </template>
                </Dialog>

				<Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="user"
                            >¿Estás seguro de que quieres eliminar <b>{{ user?.nombre }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteItem" />
                    </template>
                </Dialog>
			</div>
		</div>
    </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import ApiService from '@/service/ApiService';

export default {
	ApiService: null,
	data() {
        return {
            users: null,
            user: {
			},
			errors: [],
			selectedUsers: null,
            filters: {},
            submitted: false,
			createDialog: false,
			deleteDialog: false,
            statuses: [
				{label: 'DISPONIBLE', value: 'DISPONIBLE'},
				{label: 'PRESTADO', value: 'PRESTADO'},
            ]
        }
    },
	created() {
        this.ApiService = new ApiService();
        this.initFilters();
    },
    async mounted() {
        const response = await this.ApiService.get('usuarios');

		this.users = response
		console.log(this.users);
    },
	methods: {
		openNew() {
			this.user = {};
			this.submitted = false;
			this.createDialog = true;
		},

		createItem() {
			this.submitted = false;
			this.createDialog = false;
			this.product = {};
		},
		editItem(user) {
			this.user = {...user};
			this.createDialog = true;
		},
		confirmDeleteItem(user) {
			this.user = user;
			this.deleteDialog = true;
		},


		async saveItem() {
			this.submitted = true;
			this.errors = [];

			if (this.user?.nombre?.trim()) {
				if (this.user.idUsuario) {
					await this.ApiService.put('usuarios/'+this.user?.idUsuario, this.user).then((response) => {
						console.log(response);

						// this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Updated', life: 3000});

						this.createDialog = false;
						this.user = {};
					}).catch((error) => {
						this.errors = error.response.data.errors.errors;
						// this.$toast.add({severity:'error', summary: 'Error', detail: 'user not Created', life: 3000});
					});
				}
				else {
					await this.ApiService.post('usuarios', this.user).then((response) => {
						console.log(response);
						this.users.push(response?.data);
						// this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Created', life: 3000});
						this.createDialog = false;
						this.user = {};
					}).catch((error) => {
						this.errors = error.response.data.errors.errors;
						// this.$toast.add({severity:'error', summary: 'Error', detail: 'user not Created', life: 3000});
					});
				}				
			}
		},

		async deleteItem(){
			await this.ApiService.delete('usuarios/'+this.user?.idUsuario).then((response) => {
				console.log(response);
				// this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Deleted', life: 3000});
				this.deleteDialog = false;
				this.user = {};
				this.users = this.users.filter(val => val.idUsuario !== this.user?.idUsuario);
			}).catch((error) => {
				this.errors = error.response.data.errors.errors;
				// this.$toast.add({severity:'error', summary: 'Error', detail: 'user not Deleted', life: 3000});
			});
		},

		hideDialog() {
            this.createDialog = false;
            this.submitted = false;
        },
		findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        },
        createId() {
            let id = '';
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 5; i++ ) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        },
		exportCSV() {
            this.$refs.dt.exportCSV();
        },
		initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
	}
}
</script>