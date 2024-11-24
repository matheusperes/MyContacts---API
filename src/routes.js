const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController')
const CategoryController = require('./app/controllers/CategoryController')

const router = Router();

router.get('/contacts', ContactController.index) //listar contatos (GET)
router.post('/contacts', ContactController.store) //criar contato (POST)
router.get('/contacts/:id', ContactController.show) //listar UM registro (GETone)
router.delete('/contacts/:id', ContactController.delete) //deletar um registro (DELETE)
router.put('/contacts/:id', ContactController.update) //editar um registro (PUT)


router.get('/categories', CategoryController.index);//listar contatos (GET)
router.post('/categories', CategoryController.store);//criar contato (POST)
router.get('/categories/:id', CategoryController.show) //listar UM registro (GETone)
router.delete('/categories/:id', CategoryController.delete) //deletar um registro (DELETE)
router.put('/categories/:id', CategoryController.update) //editar um registro (PUT)

module.exports = router;
