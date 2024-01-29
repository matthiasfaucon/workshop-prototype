import { defineStore } from 'pinia'

export const useArtistsList = defineStore('artistesList', () => {
  const artistesList = [
    {
        id: 1,
        nom: "Artiste 1",
        description: "Description de l'artiste 1",
        image: "image1.jpg",
        first_step_geoloc: {
          latitude: 48.856614,
          longitude: 2.3522219
        },
    },
    {
        id: 2,
        nom: "Artiste 2",
        description: "Description de l'artiste 2",
        image: "image2.jpg",
        first_geoloc: {
          latitude: 45.856614,
          longitude: 5.3522219
        },
    },
    {
        id: 3,
        nom: "Artiste 3",
        description: "Description de l'artiste 3",
        image: "image3.jpg",
        first_geoloc: {
          latitude: 85.856614,
          longitude: 9516.3522219
        },
    }
  ]

  return { artistesList }
})
