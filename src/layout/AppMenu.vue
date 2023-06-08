<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/admin/dashboard' }]
    },
    {
        label: 'Administración',
        items: [
			{
                label: 'Usuarios',
                icon: 'pi pi-fw pi-users',
                to: '/admin/usuarios'
            },
			{
                label: 'Libros',
                icon: 'pi pi-fw pi-book',
                to: '/admin/libros'
            },
			{
                label: 'Multas',
                icon: 'pi pi-fw pi-wallet',
                to: '/admin/multas'
            },
			{
                label: 'Prestamos',
                icon: 'pi pi-fw pi-bookmark',
                to: '/admin/prestamos'
            },
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
