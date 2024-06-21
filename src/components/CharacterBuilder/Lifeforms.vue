<template>
    <div>
      <v-card style="margin-top: 1em;" @click="toggleLifeSelection">
        <v-card-title class="title" style="background-color: #422214; color: white">
          {{ race.name }}
        </v-card-title>
        <v-card-text class="descrip mt-2">
          {{ race.description }}
        </v-card-text>
        <div style="display: flex;">
          <v-card class="w-50">
            <v-card-title class="title" style="color: white">
              {{ race.major_trait.name }}
            </v-card-title>
            <v-card-subtitle class="mt-2">
              Major Trait
            </v-card-subtitle>
            <v-card-text class="descrip">
              {{ race.major_trait.description }}
            </v-card-text>
          </v-card>
          <v-divider vertical=true></v-divider>
          <v-card class="w-50">
            <v-card-title class="title" style="color: white">
              {{ race.minor_trait.name }}
            </v-card-title>
            <v-card-subtitle class="mt-2">
              Minor Trait
            </v-card-subtitle>
            <v-card-text class="descrip">
              {{ race.minor_trait.description }}
            </v-card-text>
          </v-card>
        </div>
      </v-card>
      <v-divider></v-divider>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      race: {
        type: Object,
        required: true
      }
    },
    methods: {
      toggleLifeSelection() {
        this.$emit('toggle-selection');
      }
    }
  };
  </script>
  
  <style scoped>
  .title {
    font-family: 'Mosherif', sans-serif;
    font-size: xx-large;
    color: bisque;
    background-color: gray;
  }
  
  .descrip {
    font-family: 'Acre-Semibold', sans-serif;
    color: rgb(78, 71, 71);
  }
  </style>
  