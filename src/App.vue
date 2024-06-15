<template>
    <v-app style="background-color: #2D323F;">
      <v-main>
        <RouterView />
      </v-main>
    </v-app>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  export default {
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
  