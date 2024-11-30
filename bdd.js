//Gestion de la bdd global
const Sequelize = require('sequelize');
const BDD = new Sequelize('bddFesseBot', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'bddFesseBot.sqlite',
  });


// Personne(id, pseudo, niveau, serveurId)
const Personne = BDD.define('Personne', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pseudo: Sequelize.STRING,
  niveau: Sequelize.INTEGER,
  serveurId: Sequelize.INTEGER,

});


//Serveur(id, init)
const Serveur = BDD.define('Serveur', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    init: Sequelize.BOOLEAN,
    
  });

//Serveur.hasmany(Personne, {foreignKey: 'serveurId', sourceKey: 'id'});
//Personne.belongsTo(Serveur, {foreignKey: 'serveurId', targetKey: 'id'});