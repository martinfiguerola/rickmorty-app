const { Episode, Character } = require('../models/index')
const getEpisodesApi = require('../utils/middlewares/getAllEpisodes')

const getAllEpisodes = async (req, res, next) => {
  try {
    const allEpisodes = await getEpisodesApi()
    res.send({ status: 'OK', data: allEpisodes })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllEpisodes,
}