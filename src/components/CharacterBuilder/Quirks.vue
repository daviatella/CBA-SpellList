<template>
  <v-container class="quirk-container">
    <div class="points"> Selected Traits: </div>
    <div v-if="chosenQuirks.length==0" class="subtitle"> None Selected </div>
    <v-row>
      <v-card :ripple="false" class="quirk-card mb-5" v-for="(quirk, index) in chosenQuirks" :key="index"
        style="margin-top: 1em;">
        <v-card-title class="title" style="background-color: #422214; color: white; text-align: center;">
          {{ quirk.name }}
        </v-card-title>
        <div v-for="(subquirk, subindex) in quirk.subquirks" class="cursor-pointer" :key="subquirk.name"
          @click="removeQuirk(quirk, subindex)">
          <v-card-subtitle class="title" style="background-color: #422214; color: white; text-align: center;">
            <div class="mt-2 mb-2">
              Rank {{ subindex + 1 }} - {{ subquirk.name }}
            </div>
          </v-card-subtitle>
          <v-card-text class='descrip'>
            {{ subquirk.description }}
          </v-card-text>
        </div>
      </v-card>
    </v-row>
    <v-divider :thickness="3" class="mt-6 mb-3"></v-divider>
    <div class="points"> {{ points }} Points Remaining <div class="subtitle"> Click on quirks to select them</div>
    </div>

    <v-divider :thickness="3" class="mb-6"></v-divider>
    <v-row :key="loader">
      
      <v-card :ripple="false" class="quirk-card" v-for="(quirk, index) in quirks" :key="index" style="margin-top: 1em;">
        <v-card-title class="title" :style="{backgroundColor: quirk.special? 'goldenrod' : '#422214', color: 'white', textAlign: 'center'}">
          {{ quirk.name }}
        </v-card-title>

        <div v-for="(subquirk, subindex) in quirk.subquirks" class="cursor-pointer" :key="subquirk.name"
          @click="addQuirk(subquirk, quirk, subindex)">

          <v-card-subtitle class="title" style="background-color: #422214; color: white; text-align: center;">
            <div class="mt-2 mb-2" :class="{ 'selected': subquirk.selected }">
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
import { ref, watch, defineEmits } from 'vue';
import quirkJson from '../../data/quirks.json';

const points = ref(2);
const quirks = quirkJson.quirks;
let chosenQuirks = ref([])
let loader = ref(0)
const emit = defineEmits(['updateChosenQuirks']);

function addQuirk(subquirk, quirk) {
  let i = chosenQuirks.value.findIndex(el => el.name == quirk.name)
  let newSub = []
  let cost = 0
  for (let s of quirk.subquirks) {
    if (!s.selected) {
      cost++
    }
    if (s.name == subquirk.name) {
      break;
    }
  }
  if (points.value >= cost) {
    for (let s of quirk.subquirks) {
      newSub.push(s)
      s.selected = true;
      if (s.name == subquirk.name) {
        break;
      }
    }
    subquirk.selected = true;
    points.value -= cost;
    if (i >= 0) {
      chosenQuirks.value[i].subquirks.push(subquirk)
    } else {
      let newQuirk = {
        name: quirk.name,
        subquirks: newSub,
      }
      chosenQuirks.value.push(newQuirk)
    }
  }
}

function removeQuirk(q, subindex) {
  let quirkIndex = chosenQuirks.value.findIndex(el => el.name == q.name)
  let quirk = chosenQuirks.value[quirkIndex]
  let refund = 0
  for (let i = 0; i < quirk.subquirks.length; i++) {
    let name = quirk.subquirks[i].name
    let ogQuirkI = quirks.findIndex(el => el.name == q.name)
    let ogSubI = quirks[ogQuirkI].subquirks.findIndex(el => el.name == name)
    quirks[ogQuirkI].subquirks[ogSubI].selected = false;
    quirk.subquirks.splice(i, 1)
    refund++;
    if (i == subindex) {
      break;
    } else {
      subindex--;
    }
    i--
  }
  points.value += refund
  if (quirk.subquirks.length == 0) {
    chosenQuirks.value.splice(quirkIndex, 1)
  }

  loader.value++

}

watch(chosenQuirks, (newValue) => {
  emit('updateChosenQuirks', newValue);
}, { deep: true });
</script>

<style scoped>
.title {
  font-family: 'Mosherif', sans-serif;
  font-size: xx-large;
  color: bisque;
  background-color: gray;
}

.subtitle {
  text-align: center;
  font-family: 'Mosherif', sans-serif;
  font-size: x-large;
  color: rgb(71, 66, 66);
}

.selected {
  color: white;
  background-color: black;
  display: none;
}

.points {
  font-family: 'Mosherif', sans-serif;
  font-size: xx-large;
  color: #4D1C0D;
  text-align: center;
}

.quirk-card {
  width: 18em;
  height: fit-content;
  margin: auto;
  border: 2px solid black
}

.descrip {
  font-family: 'Acre-Semibold', sans-serif;
  /* color: rgb(78, 71, 71); */
}
</style>
