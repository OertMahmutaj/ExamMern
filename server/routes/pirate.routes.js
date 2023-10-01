const PirateController = require('../controllers/pirate.controller');

module.exports = (app) => {
    app.get('/api', PirateController.index);
    app.post('/api/pirate/new', PirateController.createPirate); 
    app.get('/api/pirates', PirateController.getAllPirates); 
    app.get('/api/pirate/:id', PirateController.getPirate);
    app.patch('/api/pirate/:id', PirateController.updatePirate);
    app.delete('/api/pirate/:id', PirateController.deletePirate);
}
