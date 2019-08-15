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
  const text = 'INSERT INTO contacts (user_id, contact_name, email, mob_number, phone_number, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, user_id, contact_name, email, mob_number, phone_number, address';
  const params = [ contact.userId, contact.name, contact.email, contact.mob_number, contact.phone_number, contact.address ];
  return query(text, params)
    .then(result => {
      res.json({
        success: true,
        message: 'Contact created successfully!',
        data: result.rows[0],
      });
    })
    .catch(err => {
      throw err;
    })
}

const updateContact = (req, res) => {
  const contact = req.body;
  const text = 'UPDATE contacts SET user_id=$1, contact_name=$2, email=$3, mob_number=$4, phone_number=$5, address=$6 WHERE id=$7 RETURNING  id, user_id, contact_name, email, mob_number, phone_number, address';
  const params = [ contact.userId, contact.name, contact.email, contact.mob_number, contact.phone_number, contact.address, contact.id ];
  return query(text, params)
    .then(result => {
      res.json({
        success: true,
        message: 'Contact updated successfully!',
        data: result.rows[0],
      })
    })
    .catch(err => {
      throw err;
    })
}

const deleteContact = (req, res) => {
  const id = req.params.id;
  const text = 'DELETE FROM contacts where id=$1';
  const params = [id];
  return query(text, params)
    .then(result => {
      res.json({
        success: true,
        message: 'Contact deleted successfully!!!',
        id: id,
      });
    });
}

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact
}