const { Router } = require('express')
const epsiodesController = require('../../controllers/episodesController')

const router = Router()

router.get('/', epsiodesController.getAllEpisodes)

router.get('/:episodeId')

router.post('/')

router.put('/:episodeId')

router.delete('/:episodeId')



module.exports = router