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
          <img :src="`../dist/${artiste.image}`" :alt="`${artiste.image}`" class="swiper-slide-image">
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
  padding: 2rem;
  /* Ajustez selon vos besoins */
  height: 100%;
  /* Utilisez la hauteur en pourcentage pour une meilleure responsivité */
  display: flex;
  overflow: hidden;
  /* Empêche le débordement des éléments en dehors du conteneur */
}

.swiper-slide {
  width: 100%;
  flex: 0 0 auto;
  /* Assurez-vous que la largeur est déterminée par le contenu */
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

.swiper-slide-image {
  width: 100%;
  height: auto;
}
</style>

