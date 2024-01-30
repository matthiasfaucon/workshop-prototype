<template>
  <h2 class="page-title">Il reste peu de temps !</h2>
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
    <SwiperSlide v-for="artiste in artistesList" :key="artiste.id">
      <RouterLink :to='`/product/${artiste.id}`'>
        <div class="swiper-slide-content">
          <img :src="`./src/assets/${artiste.image}`" :alt="`${artiste.image}`" class="swiper-slide-image">
          <p class="swiper-slide-nom">{{ artiste.nom }}</p>
          <p class="swiper-slide-description">Du {{ formatDate(artiste.begin_date) }} au {{ formatDate(artiste.end_date)
          }}</p>
        </div>
      </RouterLink>
    </SwiperSlide>
  </Swiper>
  <h2>Nos exclusivités</h2>
  <div class="filters">
    <div>
      <p>Tout</p>
    </div>
    <div>
      <p>En cours</p>
    </div>
    <div>
      <p>A venir</p>
    </div>
  </div>
  <div class="container-exclu">
    <div v-for="artiste in artistesList" class="boucle-exclu">
      <RouterLink :to='`/product/${artiste.id}`'>
        <div class="swiper-slide-content-exclu">
          <img :src="`./src/assets/${artiste.image}`" :alt="`${artiste.image}`" class="swiper-slide-image-exclu">
          <p class="swiper-slide-nom">{{ artiste.nom }}</p>
          <p class="swiper-slide-description">Du {{ formatDate(artiste.begin_date) }} au {{ formatDate(artiste.end_date)
          }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useArtistsList } from '@/stores/useArtistsList'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { format } from 'date-fns';

import 'swiper/css';

const { artistesList } = useArtistsList()

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM');
}

</script>

<style scoped>
h2 {
  font-size: 1.7rem;
  font-family: 'Eras ITC';
  font-weight: 700;
  color: white;
  margin: 2rem 5rem 0;
}

.filters {
  display: flex;
  width: 15%;
  justify-content: space-around;
  margin: 0.7rem 0 1rem 4.5rem;
  height: 2rem;
}

.filters div {
  display: flex;
  border: 1px solid #718DEA;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
}

.filters div:first-of-type {
  background-color: #718DEA;
}

.swiper {
  padding: 2rem;
  /* Ajustez selon vos besoins */
  height: 100%;
  /* Utilisez la hauteur en pourcentage pour une meilleure responsivité */
  display: flex;
  overflow: hidden;
  width: 90%;
  /* Empêche le débordement des éléments en dehors du conteneur */
}

.swiper-slide {
  width: 100%;
  flex: 0 0 auto;
  /* Assurez-vous que la largeur est déterminée par le contenu */
}

.swiper-slide-nom {
  font-size: 1.5rem;
  margin: 1rem 0 0;
  font-weight: 700;
  color: white;
}

.container-exclu {
  padding: 3rem 0 3rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.swiper-slide-description {
  font-size: 1.2rem;
  font-family: 'Futura Hv BT';
  font-weight: 600;
  color: white;
  text-align: center;
}

.swiper-slide-image {
  height: auto;
  width: 100%;
}

.swiper-slide-image-exclu {
  width: 50%;
}

.swiper-slide-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.swiper-slide-content-exclu {
  display: flex;
  flex-direction: column;
  /* align-self: center; */
  flex-wrap: wrap;
  width: 100%;
  justify-self: center;
  /* justify-content: flex-start; */
  padding: 0rem 0rem;
  /* align-content: flex-start; */
  align-items: center;
}

.boucle-exclu {
  display: flex;
  width: 30%;
}

.boucle-exclu a {
  width: 100%;
}

.swiper-slide-content:hover img {
  transform: scale(1.02);
  transition: transform 0.3s ease-in-out;

}

@media screen and (max-width: 560px) {

  h2 {
    font-size: 1.5rem;
    margin: 2rem 2rem 0;
  }

  .filters {
    width: 70%;
    margin: 2rem 2rem 0;
    gap: 1rem;
  }

  .boucle-exclu {
    width: calc(50% - 1rem);
  }
}
</style>

