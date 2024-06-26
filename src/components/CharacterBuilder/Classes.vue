<template>
    <div class="class-container">
        <v-col style="width: 75%;">
            <div class="tablet d-flex">
                <div class="classes">
                    <div class="class-switcher">
                        <p class="switcher-title">Basic Disciplines</p>
                    </div>
                    <div class="class-picker">
                        <div v-for="(cl, index) in basicClasses" :key="index" class="mt-5">
                            <p class="class-name">{{ cl.name }}</p>
                            <div class="d-flex">
                                <v-btn elevation="0" class="class-btn btn-red" @click="chooseDiscipline(cl, 1)">{{
                                    cl.class_1 }}</v-btn>
                                <v-btn elevation="0" class="class-btn btn-blue ml-3" @click="chooseDiscipline(cl, 2)">{{
                                    cl.class_2 }}</v-btn>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="class-display">
                    <div class="class-header">
                        <p class="header-title" v-if="chosenDisc">{{ chosenDisc.name }} - {{
                            chosenDisc["class_"+chosenClass] }}</p>
                    </div>
                    <div class="details-container d-flex">
                        <div class="skills-container">
                            <div v-for="skill in chosenFeatures" class="skill">
                                <div class="skill-header d-flex">
                                    <p style="text-align: center;"> {{ skill.name }}</p> <v-spacer></v-spacer>
                                    <p> Rank {{ skill.rank }}</p>
                                </div>
                                <div class="skill-body">
                                    <p> {{ skill.description }}</p>
                                </div>
                            </div>
                            <br>
                        </div>
                        <div class="attributes-container"></div>
                    </div>
                </div>
            </div>
        </v-col>
        <v-col style="width: 30%;"></v-col>
    </div>
</template>

<script>
import classesJson from '../../data/classes.json';


export default {
    data() {
        return {
            basicClasses: classesJson.basic_disciplines,
            chosenDisc: null,
            chosenClass: '',
            chosenFeatures: []
        };
    },
    methods: {
        chooseDiscipline(disc, cl) {
            this.chosenDisc = disc;
            this.chosenClass = cl;
            let ranks = this.chosenDisc.features
            this.chosenFeatures = []
            for (let r of ranks) {
                for (let f of r.features) {
                    f.rank = r.rank
                }
                this.chosenFeatures.push(...r.features)
            }
            this.chosenFeatures = this.chosenFeatures.filter(el => {
                if (el.class) {
                    return el.class == cl
                }
                return true
            })
            console.log(this.chosenFeatures)
        },
    },
};
</script>

<style scoped>
.class-container {
    width: 100%;
}

.tablet {
    background-color: rgb(38, 35, 35);
    border-radius: 20px;
    border: 10px solid black;
    height: 50em;
}

.classes {
    background-color: #F3F2F2;
    height: 92%;
    margin-top: 2em;
    width: 20em;
    margin-left: 2em;
    border-radius: 10px;
    border: 2px solid #1c973d;
}

.class-switcher {
    width: 20em;
    margin-left: -2px;
    background-color: #1c973d;
    height: 3em;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    font-family: Mosherif;
}

.switcher-title {
    font-size: xx-large;
}

.class-picker .class-name {
    color: black;
    font-family: Acre;
    text-align: center;
    margin: auto;
}

.class-btn {
    margin: auto;
    width: 10em;
    font-family: Acre;
}

.btn-red {
    background-color: #F5B2B2;
}

.btn-blue {
    background-color: #A9CCF5;
}

.class-display {
    background-color: #F3F2F2;
    width: 53em;
    height: 92%;
    margin-left: 1.3em;
    margin-top: 2em;
    border-radius: 10px;
    border: 2px solid #1c973d;
    overflow-x: hidden;

}

.class-header {
    width: 53em;
    margin-left: -2px;
    background-color: #1c973d;
    height: 3em;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    font-family: Mosherif;
}

.header-title {
    font-size: xx-large;
}

.details-container {}

/* Designing for scroll-bar */
.skills-container {
    margin: auto;
    overflow-y: inherit;
}

.skill {
    width: 30em;
    text-align: justify;
    background-color: rgb(217, 216, 216);
    border: 2px solid black;
    border-radius: 5px;
    margin-top: 1em;
}

.skill-header {
    color: black;
    background-color: rgb(176, 176, 176);

}

.skill-body {
    color: black;
}
</style>
