<template>
  <div class="topbar">
    <v-spacer></v-spacer>
    <div>
      <p class="mt-1"> Spell List </p>
    </div>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>

    <div>
      <p class="mt-1"> Character Builder </p>
    </div>
    <v-spacer></v-spacer>
  </div>

  <div class="circle">
    <div class="title-wrapper">
      <p class="title">Title Here</p>
    </div>


  </div>
  <br>
</template>

<script>
import Toolbar from 'primevue/toolbar';

export default {
  components: { Toolbar },
  data() {
    return {

    };
  },

  methods: {

  },
};
</script>

<style scoped>
.topbar {
  background-color: #4D1C0D;
  display: flex;
  height: 4em;
  width: 100%;
  border: 2px solid black;
}

.topbar p {
  color: #F7E8D0;
  font-family: 'Mosherif', sans-serif;
  font-size: xx-large;
}

.title {
  margin: auto;
  font-size: 25px;
  font-family: 'Mosherif', sans-serif;
  z-index: 99999;
  text-align: center;

  color: black;
}

.title-wrapper {
  margin-left: 10em;
  margin-top: 15em; 
  width: 2em;
  justify-content: center;
}


.circle {
  background-color: #CA9562;
  width: 350px;
  height: 350px;
  margin: auto;
  border-radius: 50%;
  margin-top: -19em;
  border: 2px solid black;
}
</style>
