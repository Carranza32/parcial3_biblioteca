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
                    :value="prestamos"
                    v-model:selection="selectedprestamos"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} prestamos"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Prestamos</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <Column field="idLibro" header="Libro" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">titulo</span>
                            {{ slotProps.data.libro.titulo }}
                        </template>
                    </Column>
                    <Column field="idUsuario" header="Usuario" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">usuario</span>
                            {{ slotProps.data.usuario.nombre }} {{ slotProps.data.usuario.apellido }}
                        </template>
                    </Column>
                    <Column field="fechaInscripcion" header="Fecha inscripcion" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Fecha inscripcion</span>
                            {{ slotProps.data.fechaInscripcion }}
                        </template>
                    </Column>
                    <Column field="fechaDevolucion" header="Fecha devolucion" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">fechaDevolucion</span>
                            {{ slotProps.data.fechaDevolucion }}
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
                        <label for="libros" class="mb-3">Libros</label>
                        <Dropdown id="libros" v-model="prestamo.idLibro" :options="libros" optionLabel="label" optionValue="value" placeholder="Selecciona un libro"/>
                    </div>

					<div class="field">
                        <label for="usuarios" class="mb-3">Usuarios</label>
                        <Dropdown id="usuarios" v-model="prestamo.idUsuario" :options="usuarios" optionLabel="label" optionValue="value" placeholder="Selecciona un usuario"/>
                    </div>

					<div class="field">
                        <label for="fecha" class="mb-3">Fecha devolucion</label>
						<Calendar v-model="prestamo.fechaDevolucion" dateFormat="yy-mm-dd" />
                    </div>

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveItem" />
                    </template>
                </Dialog>

				<Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="prestamo"
                            >¿Estás seguro de que quieres eliminar el registro?</span
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
            prestamos: null,
            prestamo: {},
			errors: [],
			usuarios: [],
			libros: [],
			selectedprestamos: null,
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
        const libros = await this.ApiService.get('libros');
        const usuarios = await this.ApiService.get('usuarios');
        const response = await this.ApiService.get('prestamos');

		this.libros = libros.map(libro => ({ label: libro.titulo, value: libro.idLibro }));
		this.usuarios = usuarios.map(usuario => ({ label: usuario.nombre, value: usuario.idUsuario }));

		this.prestamos = response
		console.log(usuarios);
    },
	methods: {
		openNew() {
			this.prestamo = {};
			this.submitted = false;
			this.createDialog = true;
		},

		createItem() {
			this.submitted = false;
			this.createDialog = false;
			this.product = {};
		},
		editItem(prestamo) {
			this.prestamo = {...prestamo};
			this.createDialog = true;
		},
		confirmDeleteItem(prestamo) {
			this.prestamo = prestamo;
			this.deleteDialog = true;
		},


		async saveItem() {
			this.submitted = true;
			this.errors = [];

			if (this.prestamo.idPrestamo) {	
				console.log("update");				
				await this.ApiService.put('prestamos/'+this.prestamo?.idPrestamo, this.prestamo).then((response) => {
					console.log(response);

					this.createDialog = false;
					this.prestamo = {};
				}).catch((error) => {
					this.errors = error.response.data.errors.errors;
				});
			}
			else {
				console.log("crear");
				await this.ApiService.post('prestamos', this.prestamo).then((response) => {
					console.log(response);
					this.prestamos.push(response?.data);
					this.createDialog = false;
					this.prestamo = {};
				}).catch((error) => {
					console.log(error);
				});
			}

			window.location.reload();
		},

		async deleteItem(){
			await this.ApiService.delete('prestamos/'+this.prestamo?.idPrestamo).then((response) => {
				console.log(response);
				this.deleteDialog = false;
				this.prestamo = {};

				window.location.reload();
			}).catch((error) => {
				this.errors = error.response.data.errors.errors;
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