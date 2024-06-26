<template>
  <div class="d-flex mb-16">
    <v-spacer></v-spacer>
    <div v-for="region, index in allForms" class="m-auto">
      <p class="title"> {{ geoNames[index] }}</p>
      <v-col class="ml-3 mr-3">
        <v-row v-for="form in region"><v-btn v-ripple=false @click="selectLifeform(form, geoNames[index])"
            class="form-btn" :class="{ 'selected': selectedForm == form.name }">{{
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
  <v-spacer></v-spacer>
  
  <div class="tablet-out">
    <br>
    <div class="tablet d-flex">
      <div>
        <div class="img-container elevation-25">
          <br>
          <v-img v-if="imgSrc" transition="fadeintra" class="img " :lazy-src="imgSrc" :src="imgSrc"></v-img>

        </div>
      </div>
      <div class="form-attributes">
        <div>
          <div class="form-name title elevation-25">
            <p v-if="formName"> {{ formName }}</p>
          </div>
        </div>
        <div>
          <div class="elevation-25">
            <p v-if="formDesc" class="form-desc text "> {{ formDesc }}</p>
          </div>
        </div>
        <div class="d-flex trait-container">
          <div v-if="traits.length > 0" v-for="trait in traits" class="trait elevation-25">
            <div class="trait-name title"> {{ trait.trait.name }}</div>
            <div class="trait-type">
              <p class=""> {{ trait.type }} Trait </p>
            </div>
            <div class="trait-desc">
              <p class="text pa-3"> {{ trait.trait.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <v-spacer></v-spacer>
</template>

<script>
import racesJson from '../../data/races.json'

export default {
  props: ["lifeforms"],
  data() {
    let lifeforms = racesJson.races
    let feylandForms = lifeforms.slice(0, 4)
    let illumForms = lifeforms.slice(4, 8)
    let sanctumForms = lifeforms.slice(8, 12)
    let ulrukForms = lifeforms.slice(12, 16)
    let otherForms = lifeforms.slice(16, 20)
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
      traits: [],
      selectedForm: ''
    }
  },
  methods: {
    selectLifeform(form, region) {
      this.imgSrc = "/lifeforms/" + region.toLowerCase() + "/" + form.name.toLowerCase().replace(" ", "") + ".png"
      this.formName = form.name
      this.formDesc = form.description
      this.traits = []
      if (form.major_trait) {
        this.traits.push({ type: 'major', trait: form.major_trait })
      }
      if (form.minor_trait) {
        this.traits.push({ type: 'minor', trait: form.minor_trait })
      }
      if (form.extra_trait) {
        this.traits.push({ type: 'extra', trait: form.extra_trait })
      }
      this.selectedForm = form.name
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
  width: 90%;
  background-color: #26A1E9;
  color: white;
  font-family: Acre;
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

.selected {
  background-color: black;
  color: white;
}

.line-right {
  border-top: 2px solid black;
  width: 40%;
  margin-left: 5px;
}

@media (max-width: 1920px) {
  .tablet-out {
    background-color: rgb(38, 35, 35);
    width: 90%;
    margin: auto;
    border-radius: 20px;
    height: 44em;
    margin-top: -250px;
  }

  .tablet {
    background-color:  #4a4444;
    /* background-color: white; */
    width: 95%;
    height: 40em;
    border-radius: 20px;
    margin: auto;
    border: 2px solid black;
    display: block;
    overflow-x: auto;
  }

  .img {
    height: 550px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }



  .img-container {
    margin-left: 1em;
    margin-top: 20px;
    background-color: white;
    height: 600px;
    width: 400px;
    justify-content: center;
    vertical-align: middle;
    border-radius: 10px;
    border: 2px solid black;
    box-shadow: 0 3px 50px rgb(0 0 0 / 0.2);
  }

  .form-name {
    background-color: gold;
    width: 255px;
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
    margin-left: -20px;
    margin-top: 25px;

  }

  .text {
    font-family: 'Acre-Semibold', sans-serif;
    color: rgb(78, 71, 71);
  }

  .trait-container {
    margin-left: -35px;
    width: 640px;
  }

  .trait {
    background-color: aliceblue;
    margin: 1em;
    width: 50%;
    height: 350px;
    border: 1px solid black;
    border-radius: 5px;

  }

  .trait-name {
    background-color: gold;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    border: 1px solid black;
  }

  .trait-type {
    background-color: rgb(122, 114, 114);
    border: 1px solid black;
    color: white;
    font-family: 'Mosherif', sans-serif;
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    height: 30px;
  }

  .trait-desc {
    overflow-y: auto;
    height: 255px;
  }

  .form-attributes {
    margin-left: 6em;
  }
}

@media (max-width: 1280px) {
  .tablet-out {
    background-color: rgb(38, 35, 35);
    width: 100%;
    margin: auto;
    border-radius: 20px;
    height: 44em;
    margin-top: -250px;
    margin-left: -1px;

  }

  .tablet {
    background-color: #4a4444;
    width: 95%;
    height: 40em;
    border-radius: 20px;
    margin: auto;
    border: 1px solid black;
    display: block;
  }

  .img {
    height: 550px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }



  .img-container {
    margin-left: 1em;
    margin-top: 20px;
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
    width: 255px;
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
    margin-left: -20px;
    margin-top: 25px;

  }

  .text {
    font-family: 'Acre-Semibold', sans-serif;
    color: rgb(78, 71, 71);
  }

  .trait-container {
    margin-left: -35px;
    width: 640px;
  }

  .trait {
    background-color: aliceblue;
    margin: 1em;
    width: 50%;
    height: 350px;
    border: 2px solid black;
    border-radius: 5px;

  }

  .trait-name {
    background-color: gold;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    border: 1px solid black;
  }

  .trait-type {
    background-color: rgb(122, 114, 114);
    border: 1px solid black;
    color: white;
    font-family: 'Mosherif', sans-serif;
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    height: 30px;
  }

  .trait-desc {
    overflow-y: auto;
    height: 255px;
  }

  .form-attributes {
    margin-left: 40px;
    margin-top: 20px;
  }
}
</style>