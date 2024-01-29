<template>
  <Swiper :slides-per-view="3" :space-between="10" @swiper="onSwiper" @slideChange="onSlideChange">
    <SwiperSlide v-for="artiste in   artistesList  " :key="artiste.id">
      <RouterLink :to='`/product/${artiste.id}`'>
        <div class="swiper-slide-content">
          <img :src="`../src/assets/${artiste.image}`" :alt="`${artiste.image}`" class="swiper-slide-image">
          <p class="swiper-slide-nom">{{ artiste.nom }}</p>
          <p class="swiper-slide-description">{{ artiste.description }}</p>
        </div>
      </RouterLink>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { useArtistsList } from '@/stores/useArtistsList'
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

const { artistesList } = useArtistsList()

const onSwiper = (swiper) => {
  console.log(swiper);
};

const onSlideChange = () => {
  console.log('Changement de slide');
};
</script>

<style scoped>
.swiper {
  padding: 10rem;
  height: 24rem;
  display: flex;
}

.swiper-slide {
  width: 33%;
  height: max-content;
}

.swiper-slide-nom {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
}

.swiper-slide-description {
  font-size: 1rem;
  font-weight: 500;
  color: white;
}
</style>

