

<template>
    <div class="surface-0 flex justify-content-center">
        <div id="home" class="landing-wrapper overflow-hidden">
            <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
                <a class="flex align-items-center" href="#"> <img :src="logoUrl" alt="Sakai Logo" height="50" class="mr-0 lg:mr-2" /><span class="text-900 font-medium text-2xl line-height-3 mr-8">SAKAI</span> </a>
                <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                    <i class="pi pi-bars text-4xl"></i>
                </a>
                <div class="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 120px">
                    <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                        <li>
                            <a @click="smoothScroll('#hero')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#features')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Features</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#highlights')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Highlights</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#pricing')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Pricing</span>
                            </a>
                        </li>
                    </ul>
                    <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                        <Button label="Login" class="p-button-text p-button-rounded border-none font-light line-height-2 text-blue-500"></Button>
                        <Button label="Register" class="p-button-rounded border-none ml-5 font-light text-white line-height-2 bg-blue-500"></Button>
                    </div>
                </div>
            </div>

            <div
                id="hero"
                class="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
                style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
            >
                <div class="mx-4 md:mx-8 mt-0 md:mt-4">
                    <h1 class="text-6xl font-bold text-gray-900 line-height-2"><span class="font-light block">¿Buscando una biblioteca virtual?</span>Biblioteca Digital Hispánica</h1>
                    <p class="font-normal text-2xl line-height-3 md:mt-3 text-gray-700">Sed blandit libero volutpat sed cras. Fames ac turpis egestas integer. Placerat in egestas erat...</p>
                    <Button label="Get Started" class="p-button-rounded text-xl border-none mt-5 bg-blue-500 font-normal text-white line-height-3 px-3"></Button>
                </div>
                <div class="flex justify-content-center md:justify-content-end">
                    <img src="/demo/images/landing/screen-1.png" alt="Hero Image" class="w-9 md:w-auto" />
                </div>
            </div>

            <div id="features" class="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8">
                <div class="grid justify-content-center">
                    <div class="col-12 text-center mt-8 mb-4">
                        <h2 class="text-900 font-normal mb-2">Marvelous Features</h2>
                        <span class="text-600 text-2xl">Placerat in egestas erat...</span>
                    </div>

                    <div class="col-12 mt-8 mb-8 p-2 md:p-8">

                        <DataView :value="books" :layout="layout" paginator :rows="5">
							<template #header>
								<div class="flex justify-content-end">
									<DataViewLayoutOptions v-model="layout" />
								</div>
							</template>
							<template #list="slotProps">
								<div class="col-12">
									<div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
										<img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src="https://edit.org/photos/img/blog/wdn-editar-portadas-de-libros-gratis.jpg-840.jpg" :alt="slotProps.data.name" />
										<div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
											<div class="flex flex-column align-items-center sm:align-items-start gap-3">
												<div class="text-2xl font-bold text-900">{{ slotProps.data.titulo }}</div>
												<Rating :modelValue="5" readonly :cancel="false"></Rating>
												<div class="flex align-items-center gap-3">
													<span class="flex align-items-center gap-2">
														<i class="pi pi-tag"></i>
														<span class="font-semibold">{{ slotProps.data.genero }}</span>
													</span>
													<Tag :value="slotProps.data.estado" :severity="getSeverity(slotProps.data.estado)"></Tag>
												</div>
												<span class="flex align-items-center gap-2">
													<i class="pi pi-map"></i>
													<span class="font-semibold">{{ slotProps.data.editorial }}</span>
												</span>
											</div>
											<div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
												<Button icon="pi pi-eye" label="Ver detalles" rounded @click="showDetail(slotProps.data)"></Button>
											</div>
										</div>
									</div>
								</div>
							</template>

							<template #grid="slotProps">
								<div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
									<div class="p-4 border-1 surface-border surface-card border-round">
										<div class="flex flex-wrap align-items-center justify-content-between gap-2">
											<div class="flex align-items-center gap-2">
												<i class="pi pi-tag"></i>
												<span class="font-semibold">{{ slotProps.data.genero }}</span>
											</div>
											<Tag :value="slotProps.data.estado" :severity="getSeverity(slotProps.data.estado)"></Tag>
										</div>
										<div class="flex flex-column align-items-center gap-3 py-5">
											<img class="w-9 shadow-2 border-round" src="https://edit.org/photos/img/blog/wdn-editar-portadas-de-libros-gratis.jpg-840.jpg" :alt="slotProps.data.name" />
											<div class="text-2xl font-bold">{{ slotProps.data.titulo }}</div>
											<Rating :modelValue="5" readonly :cancel="false"></Rating>
											<span class="flex align-items-center gap-2">
												<i class="pi pi-user"></i>
												<span class="font-semibold">{{ slotProps.data.autor }}</span>
												<span class="font-semibold">| Editorial: {{ slotProps.data.editorial }}</span>
											</span>
											<span class="flex align-items-center gap-2">
												<i class="pi pi-language"></i>
												<span class="font-semibold">{{ slotProps.data.idioma }}</span>
											</span>
										</div>
										<div class="flex align-items-center justify-content-center">
											<Button icon="pi pi-shopping-cart" label="Ver detalles" rounded @click="showDetail(slotProps.data)"></Button>
										</div>
									</div>
								</div>
							</template>
						</DataView>
                    </div>

                    <div
                        class="col-12 mt-8 mb-8 p-2 md:p-8"
                        style="border-radius: 20px; background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #efe1af 0%, #c3dcfa 100%)"
                    >
                        <div class="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
                            <h3 class="text-gray-900 mb-2">Joséphine Miller</h3>
                            <span class="text-gray-600 text-2xl">Peak Interactive</span>
                            <p class="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-4" style="max-width: 800px">
                                “Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”
                            </p>
                            <img src="/demo/images/landing/peak-logo.svg" class="mt-4" alt="Company logo" />
                        </div>
                    </div>
                </div>
            </div>

			<Dialog v-model:visible="detailDialog" modal header="Detalle del libro" :style="{ width: '50vw' }">
				<div class="card">
					<div class="card-container">
						<div class="flex">
							<div class=" flex-1 mx-auto m-2 py-3">
								<img src="https://edit.org/photos/img/blog/wdn-editar-portadas-de-libros-gratis.jpg-840.jpg" class="border-round shadow-2 w-9" alt="">
							</div>
							<div class="flex-1 mt-5">
								<p class="font-light uppercase">{{ book.autor }}</p>
								<p class="font-bold text-4xl capitalize">{{ book.titulo }}</p>
								<div class="flex">
									<Rating :modelValue="5" readonly :cancel="false"></Rating>
									<span class="mx-3 pr-3 border-right-3">4 Reviews</span>
									<i class="pi pi-facebook text-xl mr-3"></i>
									<i class="pi pi-twitter text-xl mr-3"></i>
									<i class="pi pi-whatsapp text-xl mr-3"></i>
								</div>

								<p class="my-5">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
							
								<Divider />

								<span class="flex align-items-center gap-2">
									<div class="mr-3">
										<i class="pi pi-tags mr-2"></i>
										<span class="font-semibold capitalize">{{ book.genero }}</span>
									</div>
									<div class="mr-3">
										<i class="pi pi-calendar mr-2"></i>
										<span class="font-semibold capitalize">{{ book.anio }}</span>
									</div>
									<div class="mr-3">
										<i class="pi pi-language mr-2"></i>
										<span class="font-semibold capitalize">{{ book.idioma }}</span>
									</div>
								</span>
							</div>
						</div>
					</div>
				</div>

				<template #footer>
					<Button label="No" icon="pi pi-times" @click="detailDialog = false" text />
					<Button label="Prestar" icon="pi pi-check" @click="detailDialog = false" autofocus />
				</template>
			</Dialog>
        </div>
    </div>
    <AppConfig simple />
</template>

<script>
import ApiService from '@/service/ApiService';

export default {
	ApiService: null,
	data() {
        return {
            books: null,
			layout: 'grid',
			detailDialog: false,
			book: null
        }
    },
	created() {
        this.ApiService = new ApiService();
    },
    async mounted() {
        const response = await this.ApiService.get('libros');

		this.books = response
		console.log(this.books);
    },
	methods: {
		getSeverity(estado) {
			switch (estado) {
				case 'Disponible':
					return 'success';
				case 'Prestado':
					return 'warning';
				case 'Extraviado':
					return 'danger';
				default:
					return 'info';
			}
		},
		showDetail(data) {
			this.book = data;
			this.detailDialog = true;
		}
	}
}
</script>
