const { Router } = require('express')
const charactersController = require('../../controllers/charactersController')

const router = Router()

router.get('/', charactersController.getAllCharacters)

router.get('/:characterId', charactersController.getOneCharacter)

router.post('/', charactersController.createNewCharacter)

router.put('/:characterId', charactersController.updateOneCharacter)

router.delete('/:characterId', charactersController.deleteOneCharacter)


module.exports = router