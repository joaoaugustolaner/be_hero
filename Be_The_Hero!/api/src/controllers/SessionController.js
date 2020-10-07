const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const ong = await connection('ongs')
      .select('name')
      .where('id', id)
      .first();

    if (!ong) {
      res.status(404).json({ error: 'Ong not found' });
    }

    return res.json(ong);
  }
};
