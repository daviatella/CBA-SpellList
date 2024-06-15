<template>
  <div v-for="(quirk, index) in quirks" :key="index">
    <v-card class="quirk-card" style="margin-top: 1em;" @click="toggleLifeSelection">
      <v-card-title class="title" style="background-color: #422214; color: white; text-align: center;">
        {{ quirk.name }}
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    quirks: {
      type: Array,
      required: true
    }
  },
  mounted() {
    console.log(this.quirks)
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

.quirk-card {
  width: 25%;
  height: 25em;
}

.descrip {
  font-family: 'Acre-Semibold', sans-serif;
  color: rgb(78, 71, 71);
}
</style>