const axios = require('axios')
const { Episode } = require('../../models')

const getEpisodesApi = async () => {
  // traemos la data de api externa
  const dataApi = await axios.get('https://rickandmortyapi.com/api/episode')
  // formateamos la data que obtuvimos con un map
  const allEpisodes = dataApi.data.results?.map(episode => {
    return {
      id: episode.id,
      name: episode.name
    }
  })
  // por cada episode preguntamos si existe y si no, se crea en la base de datos 
  allEpisodes.forEach(episode => {
    Episode.findOrCreate({
      where: {
        id: episode.id,
        name: episode.name
      }
    })
  });
  return allEpisodes
}

module.exports = getEpisodesApi