<template>
  <v-app style="background-color: #2F2D3E;    overflow-x: auto;">
    <TopBar></TopBar>
    <v-main>
      <RouterView />
    </v-main>
    <v-footer class="mt-10 footer" style="background-color: #4D1C0D; color:white;">
      <div class="ma-auto">
        <p> Cloudbreaker Alliance TTRPG System © CJ Leung. All rights reserved. </p>
        <p> This site is a fan project and is not affiliated with or endorsed by CJ Leung.</p>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { useRouter } from 'vue-router';
import TopBar from './components/TopBar.vue'
export default {
  components: { TopBar },
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

<style>
.footer {
  background-color: red;
  text-align: center;
}
</style>