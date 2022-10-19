const axios = require('axios')
const { Character, Episode } = require('../../models')

const apiData = async () => {
  // ME TRAIGO TODO DE LA API DE CHARACTERS
  const api = await axios.get('https://rickandmortyapi.com/api/character')
  // FORMATEO LO QUE TRAJE DE LA API
  const apiCharacter = api.data.results.map(ch => {
    return {
      name: ch.name,
      species: ch.species,
      image: ch.image,
    }
  })
  apiCharacter.forEach(ch => {
    Character.findOrCreate({
      where: {
        name: ch.name,
        species: ch.species,
        image: ch.image,
      }
    })
  });
}

module.exports = apiData