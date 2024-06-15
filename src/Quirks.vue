<template>
  <v-container class="quirk-container">
    <div class="points"> {{ points }} Points Remaining </div>
    <v-row>
      <v-card :ripple="false" class="quirk-card" v-for="(quirk, index) in quirks" :key="index" style="margin-top: 1em;">
        <v-card-title class="title" style="background-color: #422214; color: white; text-align: center;">
          {{ quirk.name }}
        </v-card-title>
        <div v-for="(subquirk, subindex) in quirk.subquirks" class="cursor-pointer" :key="subquirk.name"
          @click="toggleQuirk(quirk, subquirk, subindex)">
          <v-card-subtitle class="title" style="background-color: #422214; color: white; text-align: center;">
            <div class="mt-2 mb-2" :class="{ 'selected': subquirk.selected}">
              Rank {{ subindex + 1 }} - {{ subquirk.name }}
            </div>
          </v-card-subtitle>
          <v-card-text :class="{ 'selected': subquirk.selected, 'descrip': true }">
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
  let newStatus = !subquirk.selected;
  let pointsChange = 0;

  // Calculate points change
  if (newStatus) {
    for (let i = 0; i <= subindex; i++) {
      if (!quirk.subquirks[i].selected) {
        pointsChange -= 1;
      }
    }
  } else {
    for (let i = subindex; i < quirk.subquirks.length; i++) {
      if (quirk.subquirks[i].selected) {
        pointsChange += 1;
      }
    }
  }

  // Apply points change
  points.value += pointsChange;

  // Update selection status
  if (newStatus) {
    for (let i = 0; i <= subindex; i++) {
      quirk.subquirks[i].selected = true;
    }
  } else {
    for (let i = subindex; i < quirk.subquirks.length; i++) {
      quirk.subquirks[i].selected = false;
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
  /* display: none; */
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
  height: fit-content;
  margin: auto;
}

.descrip {
  font-family: 'Acre-Semibold', sans-serif;
  /* color: rgb(78, 71, 71); */
}
</style>
