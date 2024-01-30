import { defineStore } from 'pinia'

export const useArtistsList = defineStore('artistesList', () => {
  const artistesList = [
        {
          id: 1, 
          nom: "The Weeknd", 
          description: "The Weeknd, est un chanteur, acteur, auteur-compositeur-interprète et producteur canadien", 
          image: "image1.jpg",
          begin_date: "2021-06-01",
          end_date: "2021-06-14",
          first_step_geoloc: {
            latitude: 48.856614,
            longitude: 2.3522219
          },
          second_step_geoloc : [
            {
              id: 1,
              adresse : "Adresse 1",
              latitude: 40.18995,
              longitude: 10.59605,
              is_working: true,
              url: "https://youtu.be/dQw4w9WgXcQ"
            },
            {
              id: 2,
              adresse : "Adresse 2",
              latitude: 75.5941,
              longitude: 5.18951,
              is_working: false
            }
          ]
        },
    {
      id: 2, 
      nom: "Travis Scott", 
      description: "Travis Scott, est un rappeur, chanteur, producteur, musicien, acteur, mannequin et réalisateur américain.", 
      image: "image2.jpg",
      begin_date: "2021-07-01",
      end_date: "2021-07-14",
      first_geoloc: {
        latitude: 45.856614,
        longitude: 5.3522219
      },
      second_step_geoloc : [
        {
          id: 1,
          adresse : "Adresse 1",
          latitude: 40.18995,
          longitude: 10.59605,
          is_working: false
        },
        {
          id: 2,
          adresse : "Adresse 2",
          latitude: 75.5941,
          longitude: 5.18951,
          is_working: true,
          url: "https://www.youtube.com/watch?v=d-JBBNg8YKs"
        }
      ]
    },
    {
      id: 3, nom: "Malouma", 
      description: "Maluma, Maluma, est un auteur-compositeur-interprète de reggaeton et guitariste colombien.", 
      image: "image3.jpg",
      begin_date: "2021-08-01",
      end_date: "2021-08-14",
      first_geoloc: {
        latitude: 85.856614,
        longitude: 9516.3522219
      },
      second_step_geoloc : [
        {
          id: 1,
          adresse : "Adresse 1",
          latitude: 40.18995,
          longitude: 10.59605,
          is_working: true,
          url: "https://www.youtube.com/watch?v=GmHrjFIWl6U"
        },
        {
          id: 2,
          adresse : "Adresse 2",
          latitude: 75.5941,
          longitude: 5.18951,
          is_working: false
        }
      ]
    }
  ]

  let selectedSecondStepGeolocId = 0;

  let isVisible = true;

  return { artistesList, selectedSecondStepGeolocId, isVisible   }

})
