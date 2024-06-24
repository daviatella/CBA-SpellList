<template>
  <div class="d-flex">
    <v-spacer></v-spacer>
    <div v-for="region, index in allForms" class="m-auto">
      <p class="title"> {{ geoNames[index] }}</p>
      <v-col class="ml-3 mr-3">
        <v-row v-for="form in region"><v-btn @click="selectLifeform(form, geoNames[index])" class="form-btn">{{
          form.name }}</v-btn></v-row>
      </v-col>
    </div>
    <v-spacer></v-spacer>
  </div>
  <div class="mt-16" style="height:20em;">
    <div class="d-flex">
      <v-spacer></v-spacer>
      <div class="line-left"></div>
      <div class="chevron"> </div>
      <div class="line-right"></div>
      <v-spacer></v-spacer>
    </div>
  </div>

  <div class="tablet d-flex">
    <v-col>
      <div class="img-container">
        <v-scroll-x-transition>
          <v-img v-if="imgSrc" transition="fadeintra" class="img" :src="imgSrc"></v-img>
        </v-scroll-x-transition>
      </div>
    </v-col>
    <v-col class="ml-16">
      <v-row>
        <div class="form-name title">
          <p v-if="formName"> {{ formName }}</p>
        </div>
      </v-row>
      <v-row>
        <div>
          <p v-if="formDesc" class="form-desc text"> {{ formDesc }}</p>
        </div>
      </v-row>
      <v-row class="d-flex trait-container">
        <v-col v-if="traits.length > 0" v-for="trait in traits" class="trait">
        <div >
          <div class="trait-name"> {{ trait.trait.name }}</div>
          <div class="trait-type"> {{ trait.type }}</div>
          <div >
            <p class="text pa-3"> {{ trait.trait.description }}</p>
          </div>
        </div>
      </v-col>
      
      </v-row>
    </v-col>
  </div>
</template>

<script>
import racesJson from '../../data/races.json'

export default {
  props: ["lifeforms"],
  data() {
    let lifeforms = racesJson.races
    let feylandForms = lifeforms.slice(0, 4)
    let illumForms = lifeforms.slice(4, 7)
    let sanctumForms = lifeforms.slice(7, 11)
    let ulrukForms = lifeforms.slice(11, 15)
    let otherForms = lifeforms.slice(15, 18)
    otherForms.push({ name: "Custom" })
    let allForms = [feylandForms, illumForms, sanctumForms, ulrukForms, otherForms]
    let geoNames = ["Feyland", "Illum", "Sanctum", "Ulruk", "Other"]

    return {
      lifeforms,
      feylandForms,
      illumForms,
      sanctumForms,
      ulrukForms,
      otherForms,
      allForms,
      geoNames,
      imgSrc: '',
      formName: '',
      formDesc: '',
      traits: []
    }
  },
  methods: {
    selectLifeform(form, region) {
      this.imgSrc = "/lifeforms/" + region.toLowerCase() + "/" + form.name.toLowerCase().replace(" ", "") + ".png"
      this.formName = form.name
      this.formDesc = form.description
      this.traits =[]
      if (form.major_trait) {
        this.traits.push({ type: 'major', trait: form.major_trait })
      }
      if (form.minor_trait) {
        this.traits.push({ type: 'minor', trait: form.minor_trait })
      }
      if (form.extra_trait) {
        this.traits.push({ type: 'extra', trait: form.extra_trait })
      }
    }
  },
  mounted() {
    console.log(this.otherForms)
  }
};
</script>

<style scoped>
.title {
  font-family: 'Mosherif', sans-serif;
  font-size: xx-large;
  color: black;
  text-align: center;
}

.descrip {
  font-family: 'Acre-Semibold', sans-serif;
  color: rgb(78, 71, 71);
}

.form-btn {
  margin: 0.5em;
  width: 12em;
}


.line-left {
  border-top: 2px solid black;
  width: 40%;
  margin-right: 5px;
}

.chevron {
  display: inline-block;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  width: 30px;
  height: 30px;
  transform: rotate(46deg);
  margin-top: -14px;
}


.line-right {
  border-top: 2px solid black;
  width: 40%;
  margin-left: 5px;
}

.tablet {
  background-color: rgb(74, 68, 68);
  width: 1100px;
  height: 40em;
  border-radius: 20px;
  margin: auto;
  margin-top: -250px;
  border: 2px solid black
}

.img {
  height: 600px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}



.img-container {
  margin-left: 1em;
  background-color: white;
  height: 600px;
  width: 400px;
  justify-content: center;
  vertical-align: middle;
  border-radius: 10px;
  border: 2px solid black
}

.form-name {
  background-color: gold;
  width: 225px;
  text-align: center;
  margin-top: 15px;
  margin-left: 5em;
  position: relative;
  clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
  
}

.form-desc {
  background-color: aliceblue;
  border-radius: 5px;
  width: 610px;
  overflow-y: auto;
  padding: 10px;
  height: 7em;
  margin-left: -120px;
  margin-top: 25px;
}

.text {
  font-family: 'Acre-Semibold', sans-serif;
  color: rgb(78, 71, 71);
  text-align: justify;
}

.trait {
  background-color: aliceblue;
  margin: 1em;
  width: auto;
}

.trait-container {
  overflow-x: auto;;
  width:100%;
  display: flex;
  margin-left: -5em;
  margin-top: 2em;
}

</style>