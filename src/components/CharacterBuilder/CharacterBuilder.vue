<template>
    <v-container class="body">
      <v-stepper editable :model-value="2">
        <v-stepper-header class="stepheader">
          <v-stepper-item  edit-icon="" class="step" title="Lifeform" value="1"></v-stepper-item>
          <v-divider color="black" :thickness="5"></v-divider>
          <v-stepper-item edit-icon="" class="step" title="Quirks" value="2"></v-stepper-item>
          <v-divider color="black" :thickness="5"></v-divider>
          <v-stepper-item edit-icon="" class="step" title="Class and Discipline" value="3"></v-stepper-item>
          <v-divider color="black" :thickness="5"></v-divider>
          <v-stepper-item edit-icon="" class="step" title="Cred and Items" value="4"></v-stepper-item>
          <v-divider color="black" :thickness="5"></v-divider>
          <v-stepper-item edit-icon="" class="step" title="Attributes and Masteries" value="5"></v-stepper-item>
          <v-divider color="black" :thickness="5"></v-divider>
          <v-stepper-item edit-icon="" class="step" title="Finish" value="6"></v-stepper-item>
        </v-stepper-header>
        <v-card color="#ffe4c4" class="charform">
          <v-stepper-window>
            <v-stepper-window-item value="1">
              <div v-for="(race, index) in lifeforms" :key="index">
                <Lifeforms :race="race" @toggle-selection="toggleLifeSelection(index)" />
              </div>
            </v-stepper-window-item>
            <v-stepper-window-item value="2">
                <Quirks :points="2" @update-chosen-quirks="updateQuirks" />
            </v-stepper-window-item>
          </v-stepper-window>
        </v-card>
      </v-stepper>
    </v-container>
  </template>
  
  <script>
  import Lifeforms from './Lifeforms.vue';
  import Quirks from './Quirks.vue';

  import { PDFDocument } from 'pdf-lib'
  import { saveAs } from 'file-saver';
  import racesJson from '../../data/races.json'

  export default {
    components: {
      Lifeforms, Quirks
    },
    data() {
      return {
        cats: ["Lifeform", "Quirks", "Class and Discipline", "Cred and Items", "Attributes and Masteries", "Finish"],
        lifeformNames: [],
        selected: 2
      };
    },
    async mounted() {
      const formUrl = '../public/CBA Character Sheet Playtest Fillable.pdf';
      try {
        this.lifeforms = racesJson.races
  
        console.log(this.quirks)
        for (let l of this.lifeforms) {
          this.lifeformNames.push(l.name)
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    methods: {
      toggleLifeSelection(index) {
        this.selected = index;
      },
      updateQuirks(quirks) {
        this.chosenQuirks = quirks
        console.log(quirks)
      }
    }
  };
  </script>
  
  <style scoped>
  .step {
    font-size: 2em;
    color: black;
    font-family: 'Mosherif', sans-serif;
  }
  
  .charform {
    height: fit-content;
  }
  </style>
  