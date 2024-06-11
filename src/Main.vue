<template>
    <v-container>
        <div class="buttons">
            <v-spacer></v-spacer>
            <v-checkbox v-for="el in checkboxElements" :key="el" @update:modelValue="updateSpells(el)"
                v-model="spells[el]['enabled']" :label="el[0].toUpperCase() + el.substring(1)">
            </v-checkbox>
            <v-spacer></v-spacer>
        </div>
        <div class="spells">
            <div v-for="spell in spellsToLoad" class="ml-2">
                <img v-if="enabled(spell)" class="spell" :src='spell'></img>
            </div>
        </div>

    </v-container>
</template>

<script>


export default {
    data() {
        return {
            spells: {},
            spellsToLoad: [],
            checkboxElements: [],
            multi: []
        };
    },
    mounted() {
        const files = import.meta.glob('../public/spells/**/*.png')
        let spells = {}
        let checkboxElements = []
        for (let f in files) {
            let element = f.split('../public/spells/').join().split('/')[0].split(',')[1]
            if (!spells[element]) {
                spells[element] = {}
                spells[element].enabled = false;
                spells[element].spells = []
            }
            spells[element].spells.push(f)
            if (element.split("_").length == 1) {
                checkboxElements.push(element)
            } else {
                this.multi.push(element)
            }
        }
        this.spells = spells;
        this.checkboxElements = checkboxElements.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
    },
    methods: {
        enabled(spell) {
            let el = spell.split("/")[1]
            return this.spells[el].enabled
        },
        updateSpells(element) {
            let update = [element]
            if (!this.spells[element]["enabled"]) {
                for (let el of this.multi) {
                    let names = el.split('_')
                    let show = true
                    for (let name of names) {
                        if (this.spells[name].enabled == false && name != element) {
                            show = false
                            this.spells[el].enabled = false;
                        }
                    }
                    if (show) {
                        update.push(el)
                        this.spells[el].enabled = true;
                    }
                }
                for (let element of update) {
                    for (let el in this.spells[element].spells) {
                        this.spellsToLoad.push(this.spells[element].spells[el].split("public/")[1])
                    }

                }
            } else {
                this.spellsToLoad = this.spellsToLoad.filter(url => !url.includes(element))
            }
            this.spellsToLoad = this.spellsToLoad.reduce(function (a, b) {
                if (a.indexOf(b) < 0) a.push(b);
                return a;
            }, []);
        }
    }
};
</script>

<style>
.buttons {
    display: flexbox;
}

.spells {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: top;
    justify-content: center;
    padding: 3em;
    width: 70vw;
    max-width: 90em;
    margin-top: 2rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
}

.spell {
    float: left;
    margin-top: 1em;
}
</style>