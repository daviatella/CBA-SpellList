<template>
    <v-container class="body" fluid>
        <v-row no-gutters>
            <v-col cols="auto">

                <div floating="true" :permanent="true" height="1" location="left" color="#DBD4C8" class="sidebar">

                    <Accordion :value="[0, 1, 2]" unstyled="true" multiple="true">
                        <template v-slot:expandicon>
                            <v-icon class="ml-5" icon="mdi-chevron-up"></v-icon>
                        </template>
                        <template v-slot:collapseicon>
                            <v-icon class="ml-5" icon="mdi-chevron-down"></v-icon>
                        </template>
                        <AccordionPanel
                            v-for="(els, index) in [basicArcaneElements, advancedArcaneElements, basicCosmicElements]"
                            :value="index">
                            <AccordionHeader class="title">
                                {{ titles[index] }}
                            </AccordionHeader>
                            <AccordionContent>
                                <div class="options">
                                    <div v-for="el in els" class="elements">
                                        <div class="element-wrapper">
                                            <img class="img" @click="toggleElement(el)" :src="'/icons/' + el + '.png'"
                                                :style="getFilterStyle(el)" />
                                            <p @click="toggleElement(el)" class="label cursor-pointer">{{ el }}</p>

                                        </div>
                                    </div>
                                </div>
                                <br>
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                </div>
            </v-col>
            <v-col class="content-col">
                <v-main>
                    <div class="search-wrapper">
                        <v-text-field v-model="searchQuery" class="search-box" density="compact" placeholder="Search"
                            variant="solo" @input="updateSearch" append-inner-icon="mdi-magnify">


                        </v-text-field>
                        <div class=" outer-box  ">
                            <div class=" inner-box ">
                                <v-icon class="search-icon" icon="mdi-magnify" />
                            </div>
                        </div>
                    </div>
                    <div class="spells-container">
                        <div v-for="column in distributedSpells" :key="column" class="spells-column">
                            <div v-for="sp in column" :key="sp" class="spell-item ml-2">
                                <SpellCard :spell="sp"></SpellCard>
                            </div>
                        </div>
                    </div>
                </v-main>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import spellsJson from '../../data/spells.json'
import SpellCard from './SpellCard.vue'

export default {
    components: { Accordion, AccordionContent, AccordionPanel, AccordionHeader, SpellCard },
    data() {
        return {
            spells: {},
            spellsToLoad: [],
            checkboxElements: [],
            basicArcaneElements: ['water', 'fire', 'wood', 'earth', 'wind', 'metal'],
            advancedArcaneElements: ['lightning', 'toxic', 'ice'],
            basicCosmicElements: ['order', 'chaos', 'astral'],
            filteredSpells: [],
            titles: ["Basic Arcane Elements", "Advanced Arcane Elements", "Basic Cosmic Elements"],
            multi: [],
            searchQuery: '',
            numColumns: 2 // New property to specify the number of columns
        };
    },
    computed: {
        distributedSpells() {
            const columns = Array.from({ length: this.numColumns }, () => []);
            this.filteredSpells.forEach((spell, index) => {
                columns[index % this.numColumns].push(spell);
            });
            return columns;
        }
    },
    async mounted() {
        this.spells = spellsJson;
        for (let els in spellsJson) {
            if (els.split("_").length > 1) {
                this.multi.push(els);
            }
        }
    },
    methods: {
        toggleElement(el) {
            let i = this.checkboxElements.findIndex(element => element === el);
            if (i > -1) {
                this.checkboxElements.splice(i, 1);
            } else {
                this.checkboxElements.push(el);
            }
            this.updateSpells();
        },
        getFilterStyle(el) {
            return this.checkboxElements.includes(el) ? ';' : 'filter: opacity(0.5);';
        },
        updateSearch() {
            if (this.searchQuery && this.spellsToLoad.length) {
                this.filteredSpells = this.spellsToLoad.filter(el => el.split("_").join(" ").split("/")[2].includes(this.searchQuery.toLowerCase()));
            } else {
                this.filteredSpells = this.spellsToLoad;
            }
        },
        updateSpells() {
            this.spellsToLoad = [];
            let lightning = ["water","wind","metal"]
            let toxic = ["fire","wood","earth"]
            let ice = [...lightning, ...toxic]
            for (let el of this.checkboxElements) {
                let load = []
                if(el=="lightning"){
                    load = lightning
                } else if(el=="toxic"){
                    load = toxic
                } else if(el=="ice"){
                    load = ice
                }
                if(load.length) {
                    for(let e of load){
                        this.spellsToLoad.push(...this.spells[e]);
                    }
                } else {
                    this.spellsToLoad.push(...this.spells[el]);
                }
            }
            if (this.checkboxElements.length > 1) {
                for (let el of this.multi) {
                    let names = el.split('_');
                    let show = true;
                    for (let n of names) {
                        if (!this.checkboxElements.includes(n)) {
                            show = false;
                        }
                    }
                    if (show == true) {
                        this.spellsToLoad.push(...this.spells[el]);
                    }
                }
            }
            this.spellsToLoad = [...new Set(this.spellsToLoad)];
            this.filteredSpells = this.spellsToLoad;
        }
    }
};

</script>

<style scoped>
.content-col {
    flex: 1;
    margin-left: -11em;
    overflow-x: auto;
}

.element-wrapper {
    display: flex;
    margin-top: 2em;
    gap: 0.5em;
}

.img {
    width: 40px;
    cursor: pointer;
    transition: filter 0.3s ease;
}

.img:hover {
    filter: brightness(1.2);
}

.label {
    font-size: x-large;
    color: #5f513b;
    margin-top: 0.1em;
    margin-left: 0.5em;
}

.content-col {
    margin-left: 1em;
}

.spells-container {
    display: flex;
    width: 95%;
    max-width: 95%;
    min-height: 4em;
    margin-bottom: 2rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    background-color: #F3F2F2;
    border: 2px solid black;
}

.spells-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.search-box {
    margin-top: 2em;
    margin-left: 1rem;
    max-width: 20em;

}

.search-wrapper {
    display: flex;
}

.outer-box {
    z-index: 9999;
    margin-top: 1.65em;
    margin-left: -2.2em;
    height: 3.1em;
    width: 3.1em;
    border-radius: 5px;
    background-color: #CA9562;
    border: 2px solid black;
}

.inner-box {
    height: 2.4em;
    width: 2.4em;
    margin: auto;
    margin-top: 4px;
    border-radius: 5px;
    border: 2px solid black;

    background-color: #26A1E9;
}

.search-icon {
    margin-left: 5px;
    margin-top: 7px;
}

.spell {
    float: left;
    margin-top: 1em;
}

.elements {
    font-family: 'Mosherif', sans-serif;
    display: flex;
    flex-direction: column;
    margin-top: -1em;
}

.title {

    font-family: 'Mosherif', sans-serif;
    display: block;
    font-size: x-large;
    background-color: #4D1C0D;
    color: #F7E8D0;
    width: 100%;
    height: 110%;
    border: 2px solid black;
    border-bottom: 4px solid black;
    border-top: 4px solid black;

}

.title p {
    margin-left: 0.5em;
}

.sidebar {
    border: 2px solid black;
    text-align: left;
    width: 17rem;
    margin-top: 1rem;
    height: 1000px;
    margin-right: 5em;
    background-color: #CA9562;
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%);
}

.options {
    margin-left: 1.5em;
    /* display: grid;
    grid-template-columns: repeat(2, 6em);
    gap: 0.2em; */
}
</style>
