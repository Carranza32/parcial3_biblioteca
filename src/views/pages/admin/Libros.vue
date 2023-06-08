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
                    :value="books"
                    v-model:selection="selectedBooks"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} books"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Libros</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <Column field="titulo" header="Título" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">titulo</span>
                            {{ slotProps.data.titulo }}
                        </template>
                    </Column>
                    <Column field="autor" header="Autor" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">autor</span>
                            {{ slotProps.data.autor }}
                        </template>
                    </Column>
                    <Column field="editorial" header="Editorial" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">editorial</span>
                            {{ slotProps.data.editorial }}
                        </template>
                    </Column>
                    <Column field="anio" header="Año" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">anio</span>
                            {{ slotProps.data.anio }}
                        </template>
                    </Column>
                    <Column field="genero" header="Género" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">genero</span>
                            {{ slotProps.data.genero }}
                        </template>
                    </Column>
                    <Column field="idioma" header="Idioma" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">idioma</span>
                            {{ slotProps.data.idioma }}
                        </template>
                    </Column>
                    <Column field="estado" header="Estado" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Status</span>
                            <span :class="'product-badge status-' + (slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : '')">{{ slotProps.data.inventoryStatus }}</span>
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

					<!-- <div class="field">
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
                    </div> -->

                    <div class="field">
                        <label for="stock">Stock</label>
                        <InputText id="stock" v-model.trim="book.stock" required="true" autofocus :class="{ 'p-invalid': submitted && !book.stock }" />
                        <small class="p-invalid" v-if="submitted && !book.stock">Name is required.</small>
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
            books: null,
            book: {
				id: null,
				nombre: null,
				autor: null,
				editorial: null,
				anio: null,
				genero: null,
				idioma: null,
			},
			errors: [],
			selectedBooks: null,
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
        const response = await this.ApiService.get('libros');

		this.books = response
		console.log(this.books);
    },
	methods: {
		openNew() {
			this.book = {};
			this.submitted = false;
			this.createDialog = true;
		},

		createItem() {
			this.submitted = false;
			this.createDialog = false;
			this.product = {};
		},
		editItem(book) {
			this.book = {...book};
			this.createDialog = true;
		},
		confirmDeleteItem(book) {
			this.book = book;
			this.deleteDialog = true;
		},


		async saveItem() {
			this.submitted = true;
			this.errors = [];			

			if (this.book?.titulo?.trim()) {
				if (this.book.idLibro) {
					const {estado, ...body} = this.book;
					
					await this.ApiService.put('libros/'+this.book?.idLibro, body).then((response) => {
						console.log(response);

						this.$toast.add({severity:'success', summary: 'Successful', detail: 'Book Updated', life: 3000});

						this.createDialog = false;
						this.book = {};
					}).catch((error) => {
						this.errors = error.response.data.errors.errors;
						this.$toast.add({severity:'error', summary: 'Error', detail: 'Book not Created', life: 3000});
					});
				}
				else {
					const {estado, ...body} = this.book;

					await this.ApiService.post('libros', body).then((response) => {
						console.log(response);
						this.books.push(response?.data);
						this.$toast.add({severity:'success', summary: 'Successful', detail: 'Book Created', life: 3000});
						this.createDialog = false;
						this.book = {};
					}).catch((error) => {
						this.errors = error.response.data.errors.errors;
						this.$toast.add({severity:'error', summary: 'Error', detail: 'Book not Created', life: 3000});
					});
				}				
			}
		},

		async deleteItem(){
			await this.ApiService.delete('libros/'+this.book?.idLibro).then((response) => {
				console.log(response);
				this.$toast.add({severity:'success', summary: 'Successful', detail: 'Book Deleted', life: 3000});
				this.deleteDialog = false;
				this.book = {};
			}).catch((error) => {
				this.errors = error.response.data.errors.errors;
				this.$toast.add({severity:'error', summary: 'Error', detail: 'Book not Deleted', life: 3000});
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