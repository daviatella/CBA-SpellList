<template>
    <v-card class="card" bg-color="#eaeaea">
        <v-card-title class="title">
            {{ spell.name }}
        </v-card-title>
        <div v-for="rank in spell.ranks">
            <v-card-subtitle class="subtitle">
             <p>  Rank {{ rank.rank }} </p> 
            </v-card-subtitle>
            <v-card-text class="text">
                <p>    {{ rank.effect }} </p> 
            </v-card-text>
        </div>
    </v-card>
</template>

<script>

export default {
    props: ['spell'],
    data() {
        return {

        };
    },
    mounted() {

        console.log(this.spell)
    },
    methods: {

    },
};

</script>

<style scoped>
.card {
    width: 90%;
    border: 2px solid black;
    margin: 1.2em;
}

.title {

    font-family: 'Mosherif', sans-serif;
    display: block;
    font-size: xx-large;
    background-color: #2a2e52;
    color: #f2f2f2;
    width: 100%;
    height: 110%;
    border: 2px solid black;
    border-bottom: 4px solid black;
    border-top: 4px solid black;

}

.subtitle {

    background-color: #b5d2dd;
    height:30px;
    border: 1px solid black

}

.subtitle p {
    margin-top: 5px;
    font-family: 'Mosherif', sans-serif;
    color: #2a2e52;
    font-size:30px;
}

.text {
    font-family: 'Acre-Semibold', sans-serif;
}
</style>