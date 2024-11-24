const CategoryRepository = require('../repositories/CategoryRepository');
require('express-async-errors')

class CategoryController {
  async index(request, response) {
    // listar todos os registros (Getall)
    const categories = await CategoryRepository.findAll();
    response.json(categories);
  }

  async show(request, response) {
    // listar um resgistro (GetOne)
    const {id} = request.params
    const category = await CategoryRepository.findById(id)

    if (!category) {
      return response.status(404).json({error: 'Category not found'})

    }
    return response.json(category)
  }
  async store(request, response) {
    // inserir um novo registro (Post)
    const {name} = request.body
    if (!name) {
      return response.status(400).json({ error: 'name is required'});
    }

    const category = await CategoryRepository.create({name})

    response.json(category);
  }
  async delete(request, response) {
    //deletar um registro
    const {id} = request.params;

    await CategoryRepository.delete(id)
    response.sendStatus(204);
  }
  async update(request, response) {
    //editar um registro
    const {id} = request.params;
    const {name} = request.body;

    const categoryExist = await CategoryRepository.findById(id);

    if (!categoryExist) {
      return response.status(404).json({error: 'Category not found'})
    }

    if (!name) {
      return response.status(400).json({error: 'Name is required'})
    }

    const category = await CategoryRepository.update(id, {
      name
    })

    response.json(category);
  }
}

module.exports = new CategoryController();
