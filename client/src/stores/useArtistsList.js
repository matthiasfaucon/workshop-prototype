import { defineStore } from 'pinia'

export const useArtistsList = defineStore('artistesList', () => {
  const artistesList = [
    {
      id: 1, 
      nom: "The Weeknd", 
      description: "The Weeknd, est un chanteur, acteur, auteur-compositeur-interprète et producteur canadien", image: "image1.jpg",
      image: "image1.jpg",
      first_step_geoloc: {
        latitude: 48.856614,
        longitude: 2.3522219
      },
      second_step_geoloc : [
        {
          adresse : "Adresse 1",
          latitude: 40.18995,
          longitude: 10.59605
        },
        {
          adresse : "Adresse 2",
          latitude: 75.5941,
          longitude: 5.18951
        }
      ]
    },
    {
      id: 2, 
      nom: "Travis Scott", 
      description: "Travis Scott, est un rappeur, chanteur, producteur, musicien, acteur, mannequin et réalisateur américain.", 
      image: "image2.jpg",
      first_geoloc: {
        latitude: 45.856614,
        longitude: 5.3522219
      },
      second_step_geoloc : [
        {
          adresse : "Adresse 1",
          latitude: 40.18995,
          longitude: 10.59605
        },
        {
          adresse : "Adresse 2",
          latitude: 75.5941,
          longitude: 5.18951
        }
      ]
    },
    {
      id: 3, nom: "Malouma", 
      description: "Maluma, Maluma, est un auteur-compositeur-interprète de reggaeton et guitariste colombien.", 
      image: "image3.jpg",
      first_geoloc: {
        latitude: 85.856614,
        longitude: 9516.3522219
      },
      second_step_geoloc : [
        {
          adresse : "Adresse 1",
          latitude: 40.18995,
          longitude: 10.59605,
          is_working: true
        },
        {
          adresse : "Adresse 2",
          latitude: 75.5941,
          longitude: 5.18951,
          is_working: false
        }
      ]
    }
  ]

  return { artistesList }
})
