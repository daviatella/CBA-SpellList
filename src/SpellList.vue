<template>
        <v-container class="body" fluid>
            <v-row no-gutters>
                <v-col cols="auto">
                    <v-navigation-drawer floating="true" :permanent="true" height="1" location="left" color="#DBD4C8"
                        class="sidebar">
                        <div class="title" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                            <p> Basic Arcane Elements</p>
                        </div>
                        <div class="options">
                            <div v-for="el in basicArcaneElements" class="elements">
                                <div class="element-wrapper">
                                    <img class="img" @click="toggleElement(el)" :src="'/icons/' + el + '.png'"
                                        :style="getFilterStyle(el)" />
                                    <p @click="toggleElement(el)" class="label cursor-pointer">{{ el }}</p>

                                </div>
                            </div>
                        </div>
                        <v-spacer></v-spacer>
                        <br class="mt-12">

                        <div class="title" style="margin-top: -2em;">
                            <p> Advanced Arcane Elements</p>
                        </div>
                        <div class="options">
                            <div v-for="el in advancedArcaneElements" class="elements">
                                <div class="element-wrapper ">
                                    <img class="img" @click="toggleElement(el)" :src="'/icons/' + el + '.png'"
                                        :style="getFilterStyle(el)" />
                                    <p @click="toggleElement(el)" class="label cursor-pointer">{{ el }}</p>
                                </div>
                            </div>
                        </div>
                        <br class="mt-7">
                        <div class="title" style="margin-top: -1.5em;">
                            <p> Basic Cosmic Elements</p>
                        </div>
                        <div class="options">
                            <div v-for="el in basicCosmicElements" class="elements">
                                <div class="element-wrapper">
                                    <img class="img" @click="toggleElement(el)" :src="'/icons/' + el + '.png'"
                                        :style="getFilterStyle(el)" />
                                    <p @click="toggleElement(el)" class="label cursor-pointer">{{ el }}</p>
                                </div>
                            </div>
                        </div>
                    </v-navigation-drawer>
                </v-col>
                <v-col class="content-col">
                    <v-main>
                        <v-text-field v-model="searchQuery" class="search-box" append-inner-icon="mdi-magnify"
                            density="compact" placeholder="Search" variant="solo" @input="updateSearch"></v-text-field>
                        <div class="spells">
                            <div v-for="spell in filteredSpells" :key="spell" class="ml-2 grid-item">
                                <img class="spell" :src='spell'></img>
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

export default {
    data() {
        return {
            spells: {},
            spellsToLoad: [],
            checkboxElements: [],
            basicArcaneElements: ['water', 'fire', 'wood', 'earth', 'wind', 'metal'],
            advancedArcaneElements: ['lightning', 'toxic', 'ice'],
            basicCosmicElements: ['order', 'chaos', 'astral'],
            filteredSpells: [],
            multi: [],
            searchQuery: ''
        };
    },
    async mounted() {
        const files = import.meta.glob('../public/spells/**/*.png')
        let spells = {}
        for (let f in files) {
            let element = f.split('../public/spells/').join().split('/')[0].split(',')[1]
            if (!spells[element]) {
                spells[element] = {}
                spells[element].enabled = false;
                spells[element].spells = []
            }
            spells[element].spells.push(f)
            if (element.split("_").length == 1) {
            } else {
                this.multi.push(element)
            }
        }
        this.spells = spells;
        const formUrl = '../public/CBA Character Sheet Playtest Fillable.pdf';

        try {
            const response = await fetch(formUrl);
            console.log(response)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const formPdfBytes = await response.arrayBuffer();
            const pdfDoc = await PDFDocument.load(formPdfBytes);
            const form = pdfDoc.getForm();
            const fields = form.getFields();

            fields.forEach(field => {
                const type = field.constructor.name;
                const name = field.getName();
                if(type=='PDFTextField2'){
                    form.getTextField(name).setText(name);
                }
                console.log(`${type}: ${name}`);
            });

            // const pdfBytes = await pdfDoc.save();
            // saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'pdf-lib_form_creation_example.pdf');
        } catch (error) {
            console.error('Error fetching or processing PDF:', error);
        }
    },
    methods: {
        toggleElement(el) {
            let i = this.checkboxElements.findIndex(element => element === el)
            if (i > -1) {
                this.checkboxElements.splice(i, 1)
                console.log(this.checkboxElements)
            } else {
                this.checkboxElements.push(el)
            }
            this.updateSpells(el)
        },
        getFilterStyle(el) {
            return this.checkboxElements.includes(el) ? ';' : 'filter: opacity(0.5);';
        },
        updateSearch() {
            if (this.searchQuery && this.spellsToLoad.length) {
                this.filteredSpells = this.spellsToLoad.filter(el => el.split("_").join(" ").split("/")[2].includes(this.searchQuery.toLowerCase()))
            } else {
                this.filteredSpells = this.spellsToLoad
            }
            console.log(this.filteredSpells)
        },
        enabled(spell) {
            let el = spell.split("/")[1]
            return this.spells[el].enabled
        },
        updateSpells(element) {
            this.spellsToLoad = []
            for (let el of this.checkboxElements) {
                this.spellsToLoad.push(...this.spells[el].spells.map(el => el.split("public/")[1]))
            }
            if (this.checkboxElements.length > 1) {
                for (let el of this.multi) {
                    let names = el.split('_')
                    let show = true;
                    for (let n of names) {
                        if (!this.checkboxElements.includes(n)) {
                            show = false
                        }
                    }
                    if (show == true) {
                        this.spellsToLoad.push(...this.spells[el].spells.map(el => el.split("public/")[1]))
                    }
                }
            }
            this.spellsToLoad = [...new Set(this.spellsToLoad)];
            this.filteredSpells = this.spellsToLoad
        }
    }
};
</script>

<style scoped>
.body {
    display: flex;
    height: 100vh;
    overflow-x: auto;
}

.sidebar {
    text-align: left;
    width: 17rem;
    margin-top: 1rem;
    max-height: 63vh;
    border-radius: 10px;
    background-color: #DBD4C8;
}

.content-col {
    flex: 1;
    margin-left: -11em;
    overflow-x: auto;
}

.element-wrapper {
    display: flex;
    margin-top: 2em;
    margin-left: 0.3em;
    gap: 0.5em;
}

.img {
    width: 30px;
    cursor: pointer;
    transition: filter 0.3s ease;
}

.img:hover {
    filter: brightness(1.2);
}

.label {
    font-size: large;
    color: #5f513b;
    margin-top: 0.1em;
}

.title {

    font-family: 'Mosherif', sans-serif;
    text-align: center;
    display: block;
    font-size: x-large;
    background-color: #422214;
    color: #F7E8D0;
    width: 100%;
}

.spells {
    display: flex;
    flex-wrap: wrap;
    align-items: top;
    justify-content: center;
    padding: 3em;
    width: 100%;
    align-items: flex-start;
    max-width: 100%;
    margin-bottom: 2rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    background-color: #DBD4C8;
    grid-auto-flow: row dense;
}

.search-box {
    margin-left: 1rem;
    width: 20em;
}

.spell {
    float: left;
    margin-top: 1em;
}

.elements {
    font-family: 'Mosherif', sans-serif;
    display: flex;
    flex-direction: column;
    margin-left: 2em;
    margin-top: -1em;
}

.options {
    display: grid;
    grid-template-columns: repeat(2, 6em);
    gap: 0.2em;
}
</style>
