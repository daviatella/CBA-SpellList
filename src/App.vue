<template>
    <v-app style="background-color: #2F2D3E;">
      <TopBar></TopBar>
      <v-main>
        <RouterView />
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  import TopBar from './components/TopBar.vue'
  export default {
    components: {TopBar},
    data() {
      return {
        router: useRouter()
      };
    },
    async mounted() {

  
    },
    methods: {
  
    },
  };
  
  </script>
  