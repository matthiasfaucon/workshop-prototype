<template>
  <div>
    <!-- <Map></Map> -->
    <!-- <Coordonnees /> -->
    <QrCode :artistesList="artistesList" @handleQrCodeResult="handleQrCodeResult" />
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import { useArtistsList } from '@/stores/useArtistsList';
import QrCode from '@/components/QrCode.vue';
import axios from 'axios';
import Coordonnees from '@/components/Coordonnees.vue';

const props = defineProps(['id']);

const { artistesList } = useArtistsList();
const id = ref(null);
const userLocation = ref(null);

onMounted(async () => {
  id.value = props.id;
  console.log('id:', id.value);
  getUserLocation();

  try {
    const response = await axios.post(`http://localhost:5000/generate-qrcode`, {
      artiste: artistesList[id.value - 1],
    });

    console.log(response.data); // Les données retournées par le serveur
  } catch (error) {
    console.error('Erreur lors de la requête Axios:', error);
  }
});

const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        console.log('User location:', userLocation.value);
      },
      (error) => {
        console.error('Error getting user location:', error.message);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};

</script>
