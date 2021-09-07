const db = require('../../data/db-config')

const getAll = async () => {
  return db('accounts');
}

const getById = async id => {
  return db('accounts').where('id', id).first()
}

const create = async account => {
  const [id] = await db('accounts').insert(account);
  const newAccount = await getById(id);
  return newAccount;
}

const updateById = async (id, account) => {
  await db('accounts').where('id',id).update(account)
  return getById(id)
}

const deleteById = async id => {
  return db('accounts').where('id', id).delete()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
