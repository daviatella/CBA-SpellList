<template>
    <v-app style="background-color: #422214;">
        <v-container class="body">
            <v-navigation-drawer location="left" color="#DBD4C8" class="sidebar" width="5rem">
                <div class="title">
                    <p > Basic Arcane Elements</p>
                </div>
                <v-divider></v-divider>
                <div class="options">
                    <v-checkbox v-for="el in basicArcaneElements" :value="el" class="elements" @change="updateSpells(el)"
                        v-model="checkboxElements" :label="el[0].toUpperCase() + el.substring(1)">
                        <template v-slot:append="{ props }">
                            <img class="img" v-bind="props" :src="'/icons/' + el + '.png'" />
                        </template>
                    </v-checkbox>
                </div>
                <br class="mt-4">
                <div class="title">
                    <p> Advanced Arcane Elements</p>
                </div>
                <div class="options">
                    <v-checkbox v-for="el in advancedArcaneElements" :value="el"  class="elements" @change="updateSpells(el)"
                        v-model="checkboxElements" :label="el[0].toUpperCase() + el.substring(1)">
                        <template v-slot:append="{ props }">
                            <img class="img" v-bind="props" :src="'/icons/' + el + '.png'" />
                        </template>
                    </v-checkbox>
                </div>
                <div class="title" style="margin-top: -1.5em;">
                    <p> Basic Cosmic Elements</p>
                </div>
                <v-divider></v-divider>
            

                <div class="options">
                    <v-checkbox v-for="el in basicCosmicElements" :value="el"  class="elements" @change="updateSpells(el)"
                        v-model="checkboxElements" :label="el[0].toUpperCase() + el.substring(1)">
                        <template v-slot:append="{ props }">
                            <img class="img" v-bind="props" :src="'/icons/' + el + '.png'" />
                        </template>
                    </v-checkbox>
                </div>
            </v-navigation-drawer>
            <div class="spells">
                <div v-for="spell in spellsToLoad" class="ml-2">
                    <img class="spell" :src='spell'></img>
                </div>
            </div>
        </v-container>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            spells: {},
            spellsToLoad: [],
            checkboxElements: [],
            basicArcaneElements: ['water', 'fire', 'wood', 'earth', 'wind', 'metal'],
            advancedArcaneElements: ['lightning', 'toxic', 'ice'],
            basicCosmicElements: ['order', 'chaos', 'astral'],
            multi: []
        };
    },
    mounted() {
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
    },
    methods: {
        enabled(spell) {
            let el = spell.split("/")[1]
            return this.spells[el].enabled
        },
        updateSpells(element) {
            this.spellsToLoad = []
            for (let el of this.checkboxElements) {
                this.spellsToLoad.push(...this.spells[el].spells)
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
                        this.spellsToLoad.push(...this.spells[el].spells)
                    }
                }
            }
        }
    }
};
</script>

<style>
.buttons {
    display: block;
}

.sidebar {
    text-align: left;
    width: 17rem;
    background-color: #DBD4C8;
    transform: scale(4.375);
}

.img {
    width: 30px;
    margin-left: -0.7em;
}

.title {
    text-align: center;
    display: block;
    font-size: x-large;
    background-color: #422214;
    color: #F7E8D0;
    width: 100%;
}

.spells {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: top;
    margin-left: 12vw;
    justify-content: center;
    padding: 3em;
    width: 70vw;
    max-width: 90em;
    margin-top: 2rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    background-color: #DBD4C8;
}

.spell {
    float: left;
    margin-top: 1em;
}

.elements {
    float: left;
    margin-left: 1.2em;
}

.options {
    margin-bottom: 12em;
}

body {
    
}

</style>
