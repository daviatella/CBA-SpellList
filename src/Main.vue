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
                <img v-if="spells[spell.element].enabled" class="spell" :src='spell.url'></img>
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
            checkboxElements: []
        };
    },
    mounted() {
        const files = import.meta.glob('../public/spells/**/*.png')
        console.log(files)
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
            }
        }
        this.spells = spells;
        this.checkboxElements = checkboxElements.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
    },
    methods: {
        getImagePath(url) {
            const baseUrl = new URL(import.meta.url).href;
            let newUrl = new URL(url, baseUrl).href;
            console.log(newUrl)
            return newUrl
        },
        singleElement(el) {

            if (el.split("_").length > 1) {
                console.log(el.split("_").length)
                return false
            }
            return true
        },
        updateSpells(element) {
            console.log(element, this.spells[element]["enabled"])
            if (!this.spells[element]["enabled"]) {
                for (let el in this.spells[element].spells) {
                    let spell = {
                        url: this.spells[element].spells[el].split("public/")[1],
                        element: element
                    }
                    this.spellsToLoad.push(spell)
                }
            } else {
                this.spellsToLoad = this.spellsToLoad.filter(el => el.element != element)
            }
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

.spell{
    float: left;
    margin-top: 1em;
}
</style>