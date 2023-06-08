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

				<Dialog v-model:visible="createDialog" :style="{ width: '450px' }" header="Crear nuevo libro" :modal="true" class="p-fluid">
					<Message severity="error" :closable="false" icon="" v-show="errors?.length > 0">
						<ul>
							<li v-for="error in errors" :key="error">
								{{ error }}
							</li>
						</ul>
					</Message>

					<div class="field">
                        <label for="estado" class="mb-3">Estado</label>
                        <Dropdown id="estado" v-model="book.estado" :options="statuses" optionLabel="label" placeholder="Selecciona un estado">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>

                    <div class="field">
                        <label for="titulo">Título</label>
                        <InputText id="titulo" v-model.trim="book.titulo" required="true" autofocus :class="{ 'p-invalid': submitted && !book.titulo }" />
                        <small class="p-invalid" v-if="submitted && !book.titulo">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="autor">Autor</label>
                        <InputText id="autor" v-model.trim="book.autor" required="true" autofocus :class="{ 'p-invalid': submitted && !book.autor }" />
                        <small class="p-invalid" v-if="submitted && !book.autor">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="editorial">Editorial</label>
                        <InputText id="editorial" v-model.trim="book.editorial" required="true" autofocus :class="{ 'p-invalid': submitted && !book.editorial }" />
                        <small class="p-invalid" v-if="submitted && !book.editorial">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="anio">Año</label>
                        <InputText id="anio" v-model.trim="book.anio" required="true" autofocus :class="{ 'p-invalid': submitted && !book.anio }" />
                        <small class="p-invalid" v-if="submitted && !book.anio">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="genero">Género</label>
                        <InputText id="genero" v-model.trim="book.genero" required="true" autofocus :class="{ 'p-invalid': submitted && !book.genero }" />
                        <small class="p-invalid" v-if="submitted && !book.genero">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="idioma">Idioma</label>
                        <InputText id="idioma" v-model.trim="book.idioma" required="true" autofocus :class="{ 'p-invalid': submitted && !book.idioma }" />
                        <small class="p-invalid" v-if="submitted && !book.idioma">Name is required.</small>
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
                        <span v-if="book"
                            >¿Estás seguro de que quieres eliminar <b>{{ book?.titulo }}</b
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
        const response = await this.ApiService.getWithToken('usuarios');

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

			if (this.user?.titulo?.trim()) {
				if (this.user.id_usuario) {
					await this.ApiService.put('libros/'+this.user?.id_usuario, this.user).then((response) => {
						console.log(response);

						this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Updated', life: 3000});

						this.createDialog = false;
						this.user = {};
					}).catch((error) => {
						this.errors = error.response.data.errors.errors;
						this.$toast.add({severity:'error', summary: 'Error', detail: 'user not Created', life: 3000});
					});
				}
				else {
					await this.ApiService.post('libros', this.user).then((response) => {
						console.log(response);
						this.users.push(response?.data);
						this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Created', life: 3000});
						this.createDialog = false;
						this.user = {};
					}).catch((error) => {
						this.errors = error.response.data.errors.errors;
						this.$toast.add({severity:'error', summary: 'Error', detail: 'user not Created', life: 3000});
					});
				}				
			}
		},

		async deleteItem(){
			await this.ApiService.delete('libros/'+this.user?.id_usuario).then((response) => {
				console.log(response);
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'user Deleted', life: 3000});
				this.deleteDialog = false;
				this.user = {};
			}).catch((error) => {
				this.errors = error.response.data.errors.errors;
				this.$toast.add({severity:'error', summary: 'Error', detail: 'user not Deleted', life: 3000});
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