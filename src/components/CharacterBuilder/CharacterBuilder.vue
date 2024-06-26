<template>
  <v-container class="body">
    <v-stepper editable v-model="selected" class="stepper" style="background-color:  #2F2D3E;">
      <v-stepper-header class="stepheader rounded-lg" style="background-color: whitesmoke;">
        <v-stepper-item edit-icon="" class="step" title="Lifeform" value="1"></v-stepper-item>
        <v-divider color="black" :thickness="5"></v-divider>
        <v-stepper-item edit-icon="" class="step" title="Class and Discipline" value="2"></v-stepper-item>
        <v-divider color="black" :thickness="5"></v-divider>
        <v-stepper-item edit-icon="" class="step" title="Quirks" value="3"></v-stepper-item>
        <v-divider color="black" :thickness="5"></v-divider>
        <v-stepper-item edit-icon="" class="step" title="Cred and Items" value="4"></v-stepper-item>
        <v-divider color="black" :thickness="5"></v-divider>
        <v-stepper-item edit-icon="" class="step" title="Attributes and Masteries" value="5"></v-stepper-item>
        <v-divider color="black" :thickness="5"></v-divider>
        <v-stepper-item edit-icon="" class="step" title="Finish" value="6"></v-stepper-item>
      </v-stepper-header>

      <div class="m-auto d-flex rounded-lg">
        <v-btn class="mt-5 ml-12 mb-3" @click="selected--" :disabled="selected == 0">Previous</v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn class="mt-5 mr-12 mb-3" @click="selected++" :disabled="selected == 5">Next</v-btn>
      </div>

      <div style="background-color: #2F2D3E; width: 100%; height: 1em;"></div>
      <div class="d-flex justify-center">
        <v-card color="#CA9562" class="charform rounded-lg">
          <v-stepper-window>
            <v-stepper-window-item value="1">
              <Lifeforms @toggle-selection="toggleLifeSelection(index)" />
            </v-stepper-window-item>
            <v-stepper-window-item value="2">
              <Classes />
            </v-stepper-window-item>
            <v-stepper-window-item value="3">
              <Quirks :points="2" @update-chosen-quirks="updateQuirks" />
            </v-stepper-window-item>
          </v-stepper-window>
        </v-card>
      </div>
    </v-stepper>
  </v-container>
</template>

<script>
import Lifeforms from './Lifeforms.vue';
import Quirks from './Quirks.vue';
import Classes from './Classes.vue'

import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

export default {
  components: {
    Lifeforms,
    Quirks,
    Classes
  },
  data() {
    return {
      cats: ["Lifeform", "Quirks", "Class and Discipline", "Cred and Items", "Attributes and Masteries", "Finish"],
      lifeformNames: [],
      selected: 1
    };
  },
  async mounted() {
    const formUrl = '../public/CBA Character Sheet Playtest Fillable.pdf';
  },
  methods: {
    toggleLifeSelection(index) {
      this.lifeform = index;
    },
    updateQuirks(quirks) {
      this.chosenQuirks = quirks;
      console.log(quirks);
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
  width: 100%;
  max-width: 1300px;
  overflow-x: auto;
  margin: auto;
}

.stepper {
  width: 100%;
  max-width: 1300px;
  overflow-x: scroll;
  margin: auto;
}


@media (max-width: 1920px) {
  .step {
    font-size: 2em;
  }

  .charform {
    width: 100%;
    max-width: 1800px;
    border: 2px solid black;
  }

  .stepper {
    width: 100%;
    max-width: 1800px;
  }
}

@media (max-width: 1280px) {
  .step {
    font-size: 1.75em;
  }

  .charform {
    width: 100%;
    max-width: 1300px;
  }

  .stepper {
    width: 100%;
    max-width: 1300px;
  }
}

.body {
  display: flex;
  justify-content: center;
}
</style>
