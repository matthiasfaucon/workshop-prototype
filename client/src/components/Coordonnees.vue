<template>
    <div>
        <div class="container-coordonnees">
            <div class="coordonnees" v-if="artiste" v-for="geoloc in artiste.second_step_geoloc"
                @click="$emit('geolocSelected', geoloc.id)">
                <p class="adresse">{{ geoloc.adresse }}</p>
                <p class="latitude">Latitude: <span>{{ geoloc.latitude }}</span></p>
                <p class="longitude">Longitude: <span>{{ geoloc.longitude }}</span></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { useArtistsList } from '@/stores/useArtistsList';

let { artistesList } = useArtistsList();
const id = ref(null);
const artiste = ref(null);
const { emit } = defineEmits();

onMounted(() => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    id.value = url.pathname.split('/')[2];

    artiste.value = artistesList[id.value - 1];
});

</script>

<style scoped>
.container-coordonnees {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    gap: 10rem;
    min-height: 33rem;
}

.coordonnees {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: 7px;
    background-color: rgb(25, 24, 24);
}

.coordonnees .adresse {
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
}

.coordonnees .latitude,
.coordonnees .longitude {
    font-size: 1rem;
    font-weight: 600;
    color: white;
}

.coordonnees:hover,
.coordonnees:hover {
    background-color: #718DEA;
    cursor: pointer;
}

@media screen and (max-width: 560px) {

    .container-coordonnees {
        flex-direction: column;
        gap: 0;
        height: 100%;
    }
}
</style>