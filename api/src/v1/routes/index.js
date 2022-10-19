// Traemos todos los archivos de rutas: Ruta de Characters - Ruta de Episodes
const { Router } = require('express')
const charactersRouter = require('./charactersRoutes.js')
const episodesRouter = require('./episodesRoutes')

const router = Router()

router.use('/characters', charactersRouter)
router.use('/episodes', episodesRouter)

module.exports = router