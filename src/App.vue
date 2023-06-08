<template>
    <router-view />
</template>

<style scoped></style>

<script>
export default {
	async beforeMount() {
		if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'undefined') {
			console.log(window.location.pathname);

			if (window.location.pathname != '/#/auth/login' && window.location.pathname != '/' && window.location.pathname != '') {
				window.location.replace('/#/auth/login')
				return
			}			
		}else{
			console.log(window.location.pathname);
		}
	},
}
</script>