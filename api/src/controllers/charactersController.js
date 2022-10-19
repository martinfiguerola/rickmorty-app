const { Character, Episode } = require('../models/index')
const { Op } = require('sequelize')
const getCharacters = require('../utils/middlewares/getAllCharacters')


const getAllCharacters = async (req, res, next) => {
  const { name } = req.query
  try {
    // PRECARGO LA BASE DE DATOS CON LOS DATOS DE LA API
    await getCharacters()
    if (name) {
      const character = await Character.findAll({
        where: {
          name: {
            [Op.iLike]: '%' + name + '%'
          }
        }
      })
      return res.send({ status: 'OK', data: character })
    }
    else if (req.query.filter) {
      const character = await Character.findAll({
        where: {
          species: {
            [Op.iLike]: '%' + req.query.filter + '%'
          }
        },
        limit: 6,
        offset: req.query.page,
        order: [['name', req.query.order]],
        include: { model: Episode }
      })
      return res.send({ status: 'OK', data: character })
    }
    else {
      const allCharacters = await Character.findAll({
        limit: 6,
        offset: req.query.page,
        order: [['name', req.query.order]], // ASC DESC
        include: {
          model: Episode,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      })
      return res.send({ status: 'OK', data: allCharacters })
    }
  } catch (error) {
    next(error)
  }
}

const getOneCharacter = async (req, res, next) => {
  const { characterId } = req.params
  try {
    if (!characterId) return
    const character = await Character.findByPk(characterId)
    res.send({ status: 'OK', data: character })
  } catch (error) {
    next(error)
  }
}

const createNewCharacter = async (req, res, next) => {
  const { body } = req
  try {

    const [newCharacter, ch] = await Character.findOrCreate({
      where: {
        name: body.name,
        species: body.species,
        image: body.image,
        createdInDb: true,
      }
    })
    // newCharacter --> es el objeto que queremos crear
    console.log("newCharacter", newCharacter.toJSON())
    // ch --> indica si lo creo o no
    console.log("ch", ch)
    //Seteamos los episodeos
    await newCharacter.setEpisodes(body.episode)
    //devolvemos una respuesta
    res.status(201).send({ status: "OK", data: newCharacter });

  } catch (error) {
    next(error)
  }
}

const updateOneCharacter = async (req, res, next) => {
  const { characterId } = req.params
  const body = req.body
  try {
    if (!characterId) return
    await Character.update(body, {
      where: {
        id: characterId
      }
    })
    return res.send({ status: "OK" })
  } catch (error) {
    next(error)
  }
}

const deleteOneCharacter = async (req, res, next) => {
  const { params: { characterId } } = req
  try {
    if (!characterId) return
    await Character.destroy({
      where: {
        id: characterId
      }
    })
    res.send({ status: "OK" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllCharacters,
  getOneCharacter,
  createNewCharacter,
  updateOneCharacter,
  deleteOneCharacter,
}