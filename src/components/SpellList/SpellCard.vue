<template>
    <v-card class="card" bg-color="#eaeaea">
        <v-card-title class="title">
            <p>{{ spell.name }}</p>
            <v-spacer></v-spacer>
            <img class="img" v-for="el in getElementIcons(spell.attunement)" :src="'/icons/' + el + '.png'" />
        </v-card-title>
        <v-card-text>
            <div class="misc">
                <div class="att-wrapper mt-3 ml-1">
                    <p> <b>Attunement:</b> {{ spell.attunement }}</p>
                    <p> <b>Glyph:</b> {{ spell.glyph }}</p>
                </div>
                <div class="mt-3 ml-10">
                    <p> <b>Requirements:</b> {{ spell.requirement }}</p>
                    <p> <b>Action: </b>{{ spell.action }}</p>
                </div>
            </div>
            <p class="text m-auto mt-4"> <b>Description:</b> {{ spell.description }}</p>
        </v-card-text>
        <div v-for="rank, index in spell.ranks">
            <v-card-text class="subtitle">
                <p> Rank {{ rank.rank ? rank.rank : index }} </p>
                <p class="ml-1" style="font-size: 25px; margin-top: -4px;">(LEVEL: {{ rank.level }})</p>
                <v-spacer></v-spacer>
                <p class="mr-3"> MP: {{ rank.mp }}</p>
                <v-spacer></v-spacer>
            </v-card-text>
            <v-card-text class="text">
                <div class="misc">
                    <div class="">
                        <p> <b>Range:</b> {{ rank.range }}</p>
                    </div>
                    <div class="ml-10">
                        <p> <b>Duration:</b> {{ rank.duration }}</p>
                    </div>
                    <div class="ml-10">
                    </div>
                </div>
                <p class="mt-2"> {{ rank.effect }} </p>
            </v-card-text>
        </div>
    </v-card>
</template>

<script>

export default {
    props: ['spell', 'high'],
    data() {
        return {

        };
    },
    mounted() {
        console.log(this.high)
    },
    methods: {
        getElementIcons(el) {
            let list = []
            list = el.split(/[&,]/).map(el => el.trim().toLowerCase());
            list = list.filter(el=> el!="")
            if(list[0].includes("all 6")){
                list = ["ice"]
            }  else if (JSON.stringify(list)==JSON.stringify(["fire","wood","earth"])){
                list = ["toxic"]
            } else if(JSON.stringify(list)==JSON.stringify(["water","wind","metal"])){
                list = ["lightning"]
            }
            return list
        }
    },
};

</script>

<style scoped>
.card {
    width: 90%;
    border: 2px solid black;
    margin: 2em;
}

.title {
    display: flex;

    background-color: #2a2e52;

    width: 100%;
    height: 110%;
    border: 2px solid black;
    border-bottom: 4px solid black;
    border-top: 4px solid black;

}

.title p {
    color: #f2f2f2;
    font-family: 'Mosherif', sans-serif;
    font-size: xx-large;
    margin-top: 5px;
}


.img {
    width: 40px;
    margin-left: 1em;
}

.subtitle {
    display: flex;
    background-color: #b5d2dd;
    height: 40px;
    border: 1px solid black
}

.subtitle p {
    font-family: 'Mosherif', sans-serif;
    color: #2a2e52;
    font-size: 30px;
    margin-top: -5px;
    margin-bottom: 1em;
}

.misc {
    display: flex;
}

.misc p {
    font-family: 'Acre-Semibold', sans-serif;
}

.att-wrapper {
    width: 150px;
}

.text {
    font-family: 'Acre-Semibold', sans-serif;
    text-align: justify;
}
</style>