const ContactsRepository = require('../repositories/ContactsRepository')

class ContactController {
  // aqui ficam as regras de negocios da aplicação
  async index(request, response) {
    // listar todos os registros (Getall)
    const {orderBy} = request.query;
    const contacts = await ContactsRepository.findAll(orderBy)
    response.json(contacts)
  }

  async show(request, response) {
    // listar um registro (Getone)
    const {id} = request.params
    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      return response.status(404).json({error: 'Contact not found'})
    }
    return response.json(contact)
  }

  async store(request, response) {
    // criar um registro (Post)
    const {  name, email, phone, category_id } = request.body

    if (!name) {
      return response.status(400).json({error: 'Name is required'})
    }

    const contactExist = await ContactsRepository.findByEmail(email);

    if (contactExist) {
      return response.status(400).json({error: 'Email already exists'})
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id
    })

    response.json(contact)
  }

  async update(request, response) {
    // atualizar um registro (UPDATE)
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExist = await ContactsRepository.findById(id);

    if (!contactExist) {
      return response.status(404).json({error: 'Contact not found'})
    }

    if (!name) {
      return response.status(400).json({error: 'Name is required'})
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({error: 'Email already exists'})
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id
    })

    response.json(contact)
  }

  async delete(request, response) {
    // deletar um registro (DELETE)
    const {id} = request.params

    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
