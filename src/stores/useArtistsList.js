import { defineStore } from 'pinia'

export const useArtistsList = defineStore('artistesList', () => {
  const artistesList = [
    {
        id: 1,
        nom: "Artiste 1",
        description: "Description de l'artiste 1",
        image: "image1.jpg"
    },
    {
        id: 2,
        nom: "Artiste 2",
        description: "Description de l'artiste 2",
        image: "image2.jpg"
    },
    {
        id: 3,
        nom: "Artiste 3",
        description: "Description de l'artiste 3",
        image: "image3.jpg"
    }
    // Ajoutez d'autres artistes selon vos besoins
  ]

  return { artistesList }
})
