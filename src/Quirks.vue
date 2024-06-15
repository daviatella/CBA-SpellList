<template>
  <v-container class="quirk-container">
    <div class="points"> {{ points }} Points Remaining </div>
    <v-row>
      <v-card :ripple="false" class="quirk-card" v-for="(quirk, index) in quirks" :key="index" style="margin-top: 1em;">
        <v-card-title class="title" style="background-color: #422214; color: white; text-align: center;">
          {{ quirk.name }}
        </v-card-title>
        <div v-for="(subquirk, subindex) in quirk.subquirks" class="cursor-pointer" :key="subquirk.name" @click="toggleQuirk(quirk, subquirk, subindex)">
          <v-card-subtitle class="title" style="background-color: #422214; color: white; text-align: center;">
            Rank {{ subindex + 1 }} - {{ subquirk.name }}
          </v-card-subtitle>
          <v-card-text :class="{'selected': subquirk.selected}">
            {{ subquirk.description }}
          </v-card-text>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import quirkJson from './quirks.json';

  const points = ref(2);
  const quirks = quirkJson.quirks;

  function toggleQuirk(quirk, subquirk, subindex) {
    if(subquirk.selected==false){
      points.value -= (subindex + 1);
    } else {
      points.value += (subindex + 1);
    }
    for(let s of quirk.subquirks){
      s.selected = !s.selected;
      if(s.name==subquirk.name){
        break;
      }
    }
  }
</script>

<style scoped>
.title {
  font-family: 'Mosherif', sans-serif;
  font-size: xx-large;
  color: bisque;
  background-color: gray;
}

.selected {
  color: white;
  background-color: black;
}

.points {
  font-family: 'Mosherif', sans-serif;
  font-size: xx-large;
  color: rgb(79, 79, 79);
  text-align: center;
  margin-bottom: 1em;
}

.quirk-card {
  width: 18em;
  height: 25em;
  margin: auto;
}

.descrip {
  font-family: 'Acre-Semibold', sans-serif;
  color: rgb(78, 71, 71);
}
</style>
