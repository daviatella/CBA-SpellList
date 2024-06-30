<template>
    <div class="class-container d-flex">
        <v-col class="tablet-col">
            <div class="tablet" id="tablet">
                <div class="d-flex">
                    <div class="classes">
                        <div class="class-switcher">
                            <p class="switcher-title">Basic Disciplines</p>
                        </div>
                        <div class="class-picker">
                            <div v-for="(cl, index) in basicClasses" :key="index" class="mt-6">
                                <p class="class-name">{{ cl.name }}</p>
                                <div class="d-flex">
                                    <v-btn v-ripple=false :size=btnSize elevation="0" class="class-btn btn-red"
                                        @click="chooseDiscipline(cl, 1)">{{
                                            cl.class_1 }}</v-btn>
                                    <v-btn v-ripple=false :size=btnSize elevation="0" class="class-btn btn-blue ml-3"
                                        @click="chooseDiscipline(cl, 2)">{{
                                            cl.class_2 }}</v-btn>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="class-display">
                        <div class="class-header d-flex">
                            <v-spacer></v-spacer>
                            <p class="header-title" v-if="chosenDisc">{{ chosenDisc.name }} - {{
                                chosenDisc["class_" + chosenClass] }}</p>
                            <v-spacer></v-spacer>
                            <v-spacer></v-spacer>
                        </div>
                        <div v-if="chosenDisc" class="details-container  d-flex">
                            <div>
                                <v-virtual-scroll :height="696" :items="chosenFeatures">
                                    <template v-slot:default="{ item }">
                                        <div :class="{ 'skill': true, 'selected-skill': item.selected }">
                                            <div
                                                :class="{ 'skill-header': true, 'd-flex': true, 'selected-skill-header': item.selected }">
                                                <v-spacer></v-spacer>
                                                <p> {{ item.name }}</p> <v-spacer></v-spacer>
                                                <b> Rank {{ item.rank }}</b>
                                            </div>
                                            <div class="skill-body">
                                                <p> {{ item.description }}</p>
                                            </div>
                                        </div>
                                        <br>
                                    </template>
                                </v-virtual-scroll>

                            </div>
                            <div class="attributes-container">
                                <div class="d-flex">

                                    <v-spacer></v-spacer>
                                    <Select v-model="chosenRank" @update:modelValue="updateFeatures"
                                        scrollHeight="fit-content" :options="ranks" class="select-rank"
                                        placeholder="Rank" />
                                    <v-btn class="select-btn" :size=btnSize @click="chooseClass"> Add Class </v-btn>
                                    <v-spacer></v-spacer>

                                </div>
                                <div class="advancement">
                                    <p
                                        style="text-align: center; font-family: Acre; color: black; margin-top: 5px; font-size: large;">
                                        Advances To:</p>
                                    <div v-for="cl in advancement">
                                        <p class="class-name mt-3">{{ cl.name }}</p>
                                        <div class="d-flex mb-3">
                                            <v-btn v-ripple=false :size=btnSize elevation="0"
                                                class="class-btn btn-purple">{{
                                                    cl.class_1 }}</v-btn>
                                            <v-btn v-ripple=false :size=btnSize elevation="0"
                                                class="class-btn btn-orange  ml-3">{{
                                                    cl.class_2 }}</v-btn>
                                        </div>
                                    </div>
                                </div>
                                <div class="attributes">
                                    <div v-for="group, gi in attributes" class="attribute-group">
                                        <div v-for="att, ai in group" class="d-flex" style="vertical-align: middle;">
                                            <p class="att-title"> {{ attTitles[gi][ai] }}</p>
                                            <p class="att-value"> {{ att }} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </v-col>
        <v-col>
            <div class="chosen-container">
                <Accordion value="0">
                    <AccordionPanel v-for="cl in playerList" :key="cl.class + ' | ' + cl.rank" :value="cl.class">
                        <AccordionHeader>{{ cl.class + ' | ' + cl.rank }}</AccordionHeader>
                        <AccordionContent>
                            <div class="pclass-feat" v-for="feat in cl.features"> {{ feat.name + ' - ' + feat.description }}
                            </div>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
                <!-- <div class="player-class" v-for="cl in playerList">
                    <div class="pclass-header"> {{ cl.class + ' | ' + cl.rank }}</div>
                    <div class="pclass-feat" v-for="feat in cl.features"> {{ feat.name + ' - ' + feat.description }}
                    </div>
                </div> -->
            </div>
        </v-col>
    </div>
    <v-snackbar v-model="error" :timeout="4000" color="error" attach="#tablet" class="mb-16 text-center" rounded="pill">
        Please select a Rank before adding class
    </v-snackbar>
</template>

<script>
import classesJson from '../../data/classes.json';
import Select from 'primevue/select';
import { useDisplay } from 'vuetify'
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

export default {
    data() {
        const { name } = useDisplay()
        let btnSize = name.value == 'xl' ? 'default' : 'small'
        return {
            basicClasses: classesJson.basic_disciplines,
            chosenDisc: null,
            chosenClass: '',
            error: false,
            chosenRank: 0,
            chosenFeatures: [],
            movAtt: [],
            ranks: [1, 2, 3, 4, 5, 6, 7, 8],
            playerList: [],
            btnSize
        };
    },
    components: { Select },
    methods: {
        chooseDiscipline(disc, cl) {
            this.chosenDisc = disc;
            this.chosenClass = cl;
            let ranks = this.chosenDisc.features
            let movAtt = [disc.turn_speed, disc.movement, disc.max_movement]
            let defAtt = [disc.defense, disc.physical_fortitude, disc.mental_fortitude]
            let mastAtt = [disc.weapon_mastery, disc.armor_mastery, disc.maneuver_mastery]
            this.attributes = [movAtt, defAtt, mastAtt]
            let movTitles = ["Turn Speed", "Movement", "Max Movement"];
            let defTitles = ["Defense", "Physical Fortitude", "Mental Fortitude"];
            let mastTitles = ["Weapon Mastery", "Armor Mastery", "Maneuver Mastery"];
            this.advancement = [{ name: "Weapon Master", class_1: "Duelist", class_2: "Deadshot" }, { name: "Commander", class_1: "General", class_2: "Warlord" }]
            this.attTitles = [movTitles, defTitles, mastTitles]
            this.chosenFeatures = []
            for (let r of ranks) {
                for (let f of r.features) {
                    f.rank = r.rank
                    f.selected = false
                }
                this.chosenFeatures.push(...r.features)
            }
            this.chosenFeatures = this.chosenFeatures.filter(el => {
                if (el.class) {
                    return el.class == cl
                }
                return true
            })
        },
        chooseClass() {
            if (!this.chosenRank) {
                this.error = true;
                return;
            }
            let attName = "class_" + this.chosenClass
            console.log(this.chosenDisc, this.chosenDisc[attName])
            this.playerList.push({
                class: this.chosenDisc.name + ' - ' + this.chosenDisc[attName],
                rank: this.chosenRank,
                features: this.chosenFeatures.filter(el => el.rank <= this.chosenRank)
            })
        },
        updateFeatures() {
            console.log(this.chosenRank)
            this.chosenFeatures.map((feat) => {
                if (feat.rank <= this.chosenRank) {
                    feat.selected = true;
                } else {
                    feat.selected = false
                }
            })
        }
    },
};
</script>

<style scoped>
@media (max-width: 1920px) {
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
        height: 750px;
        margin-top: 1em;
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

    .class-picker {
        margin-top: -10px;
    }

    .switcher-title {
        font-size: xx-large;
    }

    .class-name {
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
        height: 750px;
        margin-left: 1.3em;
        margin-top: 1em;
        border-radius: 10px;
        border: 2px solid #1c973d;
        overflow-x: hidden;

    }

    .class-header {
        width: 110%;
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
        margin-left: 160px;
    }

    .details-container {
        width: 760px;
    }

    /* Designing for scroll-bar */
    .skills-container {
        overflow-y: inherit;
        padding: 20px;
    }

    .skill {
        width: 25em;
        text-align: justify;
        background-color: rgb(217, 216, 216);
        border: 2px solid black;
        border-radius: 5px;
        margin-left: 1em;
        margin-right: 3em;
        margin-top: 1em;
        font-family: Acre;
    }

    .selected-skill {

        background-color: rgb(254, 238, 143);

    }

    .skill-header {
        color: black;
        background-color: rgb(176, 176, 176);
        padding: 10px;
        text-align: center;
    }

    .selected-skill-header {

        background-color: rgb(229, 197, 16);

    }


    .skill-body {
        color: black;
    }

    .skill-body p {
        padding: 10px;
    }

    .attributes-container {
        height: 100%;
        width: 100%;

    }

    .attribute-group {
        border: 1px solid black;
        border-radius: 5px;
        margin-top: 20px;
    }

    .attributes {
        margin: 0.6em;
        height: 120px;
        width: 350px;
        border-radius: 10px;
        font-family: Acre;
    }

    .att-title {
        background-color: #1c973d;
        color: white;
        min-width: 145px;
        max-width: 145px;
        padding: 3px;
        vertical-align: middle;
        border: 1px solid black;
    }

    .att-value {
        padding: 3px;
        text-align: middle;
        border: 0.5px solid black;
        width: 100%;
        color: rgb(0, 0, 0);
        background-color: #a5dcb4;
    }

    .advancement {
        border-radius: 10px;
        border: 2px solid black;
        margin: 0.6em;
        margin-top: 15px;
        width: 350px;
        height: 200px;
        background-color: #a5dcb4;
    }

    .btn-purple {
        background-color: #c265da;
    }

    .btn-orange {
        background-color: #e3c418;
    }

    .select-rank {
        margin-top: 12px;
        margin-right: 30px;
        height: fit-content;
    }

    .select-btn {
        margin-top: 15px;
        font-size: 15px;
        background-color: #dca5a5;
        border: 2px solid black;
        color: black;
    }

    .chosen-container {
        background-color: rgb(38, 35, 35);
        border-radius: 20px;
        border: 10px solid black;
        height: 50em;
    }
}

@media (max-width: 1280px) {
    .class-container {
        width: 100%;
    }

    .tablet {
        background-color: rgb(38, 35, 35);
        border-radius: 20px;
        border: 10px solid black;
        height: 41em;
        width: 850px;
    }

    .classes {
        background-color: #F3F2F2;
        height: 605px;
        margin-top: 1em;
        width: 16em;
        margin-left: 1em;
        border-radius: 10px;
        border: 2px solid #1c973d;
    }

    .class-switcher {
        width: 16em;
        margin-left: -2px;
        background-color: #1c973d;
        height: 2em;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        text-align: center;
        font-family: Mosherif;
    }

    .switcher-title {
        font-size: x-large;

    }

    .class-name {
        color: black;
        font-family: Acre;
        font-size: 13px;
        text-align: center;
        margin: auto;
    }

    .class-btn {
        margin: auto;
        width: 11em;
        font-size: 10px;
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
        width: 530px;
        height: 605px;
        margin-left: 1.3em;
        margin-top: 1em;
        border-radius: 10px;
        border: 2px solid #1c973d;
        overflow-x: hidden;

    }

    .class-header {
        width: 110%;
        margin-left: -2px;
        background-color: #1c973d;
        height: 2em;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        text-align: center;
        font-family: Mosherif;
    }

    .header-title {
        font-size: x-large;
        margin-left: 160px;
    }

    .details-container {
        width: 260px;
    }

    .skills-container {
        overflow-y: inherit;
        padding: 20px;
        height: 1000em;
    }

    .skill {
        width: 200px;
        font-size: x-small;
        text-align: justify;
        background-color: rgb(217, 216, 216);
        border: 2px solid black;
        border-radius: 5px;
        margin-left: 1em;
        margin-right: 3em;
        margin-top: 1em;
        font-family: Acre;
    }

    .selected-skill {

        background-color: rgb(254, 238, 143);

    }

    .skill-header {
        color: black;
        background-color: rgb(176, 176, 176);
        padding: 10px;
        text-align: center;
    }

    .selected-skill-header {

        background-color: rgb(229, 197, 16);

    }


    .skill-body {
        color: black;
    }

    .skill-body p {
        padding: 10px;
    }

    .attributes-container {
        width: 100%;

    }

    .attribute-group {
        border: 1px solid black;
        border-radius: 5px;
        margin-top: 20px;
    }

    .attributes {
        font-size: x-small;
        margin: 0.6em;
        height: 120px;
        min-width: 250px;
        max-width: 250px;
        border-radius: 10px;
        font-family: Acre;
    }

    .att-title {
        background-color: #1c973d;
        color: white;
        min-width: 145px;
        max-width: 145px;
        padding: 3px;
        vertical-align: middle;
        border: 1px solid black;
    }

    .att-value {
        padding: 3px;
        text-align: middle;
        border: 0.5px solid black;
        width: 100%;
        color: rgb(0, 0, 0);
        background-color: #a5dcb4;
    }

    .advancement {
        border-radius: 10px;
        border: 2px solid black;
        margin: 0.6em;
        margin-top: 15px;
        width: 250px;
        height: fit-content;
        background-color: #a5dcb4;
    }

    .btn-purple {
        background-color: #c265da;
        width: fit-content
    }

    .btn-orange {
        background-color: #e3c418;
        width: fit-content
    }

    .select-rank {
        margin-top: 12px;
        margin-left: -20px;
        height: fit-content;
        font-size: small;
    }

    .select-btn {
        margin-top: 20px;
        font-size: 10px;
        margin-right: 20px;
        margin-left: -20px;
        width: fit-content;
        background-color: #dca5a5;
        border: 2px solid black;
        color: black;
    }

    .chosen-container {
        background-color: rgb(38, 35, 35);
        border-radius: 20px;
        border: 10px solid black;
        height: 35em;
    }
}
</style>
