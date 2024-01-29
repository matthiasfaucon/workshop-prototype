<template>
  <Swiper :breakpoints="{
    '@0.00': {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    '@0.75': {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    '@1.00': {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  }" @swiper="onSwiper" @slideChange="onSlideChange">
    <SwiperSlide v-for="artiste in artistesList  " :key="artiste.id">
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

