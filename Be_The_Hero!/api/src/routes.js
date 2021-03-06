const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.index);

routes.post('/incidents', IncidentsController.create)
routes.get('/incidents', IncidentsController.index)
routes.delete('/incidents/:id', IncidentsController.delete)

routes.get('/profile', ProfileController.index)

routes.post('/session', SessionController.create)

module.exports = routes;
