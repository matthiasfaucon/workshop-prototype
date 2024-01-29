<script setup>

import { ref, onMounted, nextTick, onBeforeMount } from 'vue';
import axios from 'axios';
import L from 'leaflet';

const nodes = ref([]);
const map = ref(null);

const fetchOSMData = async () => {
    try {
        const response = await axios.get(
            `https://overpass-api.de/api/interpreter?data=[out:json];(node(around:1000,48.8588442,2.2943506)[%22name%22=%22%22];);out;`
        );

        nodes.value = response.data.elements.filter((element) => element.type === 'node');
    } catch (error) {
        console.error('Erreur lors de la récupération des données OpenStreetMap', error);
    }
};

onMounted(async () => {
    await fetchOSMData();
});

const initializeMap = () => {
    map.value = L.map(map.value).setView([48.8588442, 2.2943506], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value);
};
</script>
