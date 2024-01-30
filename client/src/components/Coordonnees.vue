<template>
    <div>
        <div v-if="artiste" v-for="geoloc in artiste.second_step_geoloc">
            <div class="coordonnees">
                {{ geoloc.adresse }}
                {{ geoloc.latitude }}
                {{ geoloc.longitude }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useArtistsList } from '@/stores/useArtistsList';

const { artistesList } = useArtistsList();
const id = ref(null);
const artiste = ref(null);

onMounted(async () => {
    id.value = props.id;
    console.log('id:', id.value);
    artiste.value = artistesList[id.value - 1];
});

</script>