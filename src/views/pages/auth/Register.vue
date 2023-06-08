<template>
	<div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
	<Toast />
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Registrate</div>
                        <span class="text-600 font-medium">Sign up to continue</span>
                    </div>

                    <div>
						<label for="nombre" class="block text-900 text-xl font-medium mb-2">Nombres</label>
                        <InputText id="nombre" type="text" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="user.nombre" />

						<label for="apellido" class="block text-900 text-xl font-medium mb-2">Apellidos</label>
                        <InputText id="apellido" type="text" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="user.apellido" />

						<label for="direccion" class="block text-900 text-xl font-medium mb-2">Direccion</label>
                        <InputText id="direccion" type="text" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="user.direccion" />

                        <label for="dui" class="block text-900 text-xl font-medium mb-2">DUI</label>
                        <InputText id="dui" type="text" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="user.dui" />

						<label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="user.email" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="user.password"  :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Registrar" class="w-full p-3 text-xl" @click="register()"></Button>

						<div class="col-12 mt-5 text-center">
                            <i class="pi pi-fw pi-arrow-left text-blue-500 mr-2" style="vertical-align: center"></i>
                            <router-link to="/auth/login" class="text-blue-500">Regresar al login</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from '@/service/ApiService';

export default {
	name: 'Register',
	ApiService: null,
	data() {
		return {
			logoUrl: '/demo/images/logo/logo.png',
			checked: false,
			user: {
				nombre: 'Usuario',
				apellido: 'Nuevo',
				direccion: 'Santa Ana',
				telefono: '123654879',
				dui: '12345678-2',
				email: 'mario.carranza@gmail.com',
				password: '12345678',

			}
		};
	},
	created() {
        this.ApiService = new ApiService();
    },
	methods: {
		register() {
			console.log(this.user);

			this.ApiService.post('auth/register', this.user)
			.then(({ data }) => {
				console.log(data);
				this.$toast.add({severity:'success', summary: 'Successful', detail: data, life: 3000});
				// this.$router.push({ name: 'Login' });
			})
			.catch((error) => {
				console.log(error?.response?.data);
				this.$toast.add({severity:'error', summary: 'Error', detail: error?.response?.data, life: 3000});
			});
		}
	}
}
</script>