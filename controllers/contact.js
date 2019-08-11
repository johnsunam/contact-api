const query = require('../models');

const getContacts = (req, res) => {
  const userId = req.params.userId;
  const text = 'SELECT * FROM CONTACTS WHERE user_id = $1';
  const params = [ userId ];
  return query(text, params)
    .then(result => {
      res.json({
        success: true,
        data: result.rows,
      });
    })
    .catch(err =>{
       throw(err)
      });
}

const createContact = (req, res) => {
  const contact = req.body;
  const text = 'INSERT INTO contacts (user_id, contact_name, email, mob_number, phone_number, address) VALUES ($1, $2, $3, $4, $5, $6)';
  const params = [ contact.userId, contact.name, contact.email, contact.mob_number, contact.phone_number, contact.address ];
  return query(text, params)
    .then(result => {
      res.json({
        success: true,
        message: 'Contact create successfully!'
      });
    })
    .catch(err => {
      throw(err);
    })
}

module.exports = {
  getContacts,
  createContact
}