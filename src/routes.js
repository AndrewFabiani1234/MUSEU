const express = require('express');
const routes = express.Router();

const PartsController = require("./controllers/PartsController");
const partsController = new PartsController();

const UserController = require("./controllers/users.controller");
const usersController = new UserController();

/* Endpoints com peças */
routes.get("/pecas", partsController.listPeca());
routes.get("/pecas/:numero", partsController.listPeca());
routes.post("/pecas/register", partsController.registerPeca());
routes.patch("/pecas/update", partsController.updatePeca());
routes.delete("/pecas/:numero", partsController.deletePeca());

/* Endpoints com usuarios */
routes.get("/usuarios", usersController.listUsuario());
routes.get("/usuarios/:email", usersController.listUsuario());
routes.post("/usuarios/register", usersController.registerUsuario());
routes.patch("/usuarios/update", usersController.updateUsuario());
routes.delete("/usuarios/:email", usersController.deleteUsuario());


// routes.post('/login', SessionController.create);
// routes.get('/parts', PartsController.select);
// routes.post('/parts/register', multer(multerConfig).array('file', 2), PartsController.insert);
// routes.delete('/parts/delete/:numero', PartsController.delete);
// routes.get('/parts/edit/:numero', PartsController.listSpecificPart);
// routes.put('/parts/edit/:id', multer(multerConfig).array('file', 2), PartsController.update);

module.exports = routes;