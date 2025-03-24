const { Client } = require('pg');
const { faker } = require('@faker-js/faker');

// Connexion à PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'gestionformationbd',
  password: '2002',
  port: 5432,
});

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connecté à la base de données !');

    // Insérer des rôles
    const roles = ['utilisateur', 'responsable', 'administrateur'];
    for (const role of roles) {
      await client.query('INSERT INTO Role (Nom) VALUES ($1)', [role]);
    }

    // Insérer des profils
    for (let i = 0; i < 5; i++) {
      await client.query('INSERT INTO Profil (Libelle) VALUES ($1)', [faker.person.jobTitle()]);
    }

    // Insérer des structures
    for (let i = 0; i < 5; i++) {
      await client.query('INSERT INTO Structure (Libelle) VALUES ($1)', [faker.company.name()]);
    }

    // Insérer des employeurs
    for (let i = 0; i < 5; i++) {
      await client.query('INSERT INTO Employeur (nomEmployeur) VALUES ($1)', [faker.company.name()]);
    }

    // Insérer des domaines
    for (let i = 0; i < 5; i++) {
      await client.query('INSERT INTO Domaine (Libelle) VALUES ($1)', [faker.commerce.department()]);
    }

    // Insérer des utilisateurs
    for (let i = 0; i < 10; i++) {
      await client.query(
        'INSERT INTO Utilisateur (Login, Password, idRole) VALUES ($1, $2, $3)',
        [faker.internet.username(), faker.internet.password(), faker.number.int({ min: 1, max: 3 })]
      );
    }

    // Insérer des participants
    for (let i = 0; i < 10; i++) {
      await client.query(
        'INSERT INTO Participant (Nom, Prenom, idStructure, idProfil, Email, Tel) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          faker.person.lastName(),
          faker.person.firstName(),
          faker.number.int({ min: 1, max: 5 }),
          faker.number.int({ min: 1, max: 5 }),
          faker.internet.email(),
          faker.phone.number(),
        ]
      );
    }

    // Insérer des formateurs
    for (let i = 0; i < 10; i++) {
      await client.query(
        'INSERT INTO Formateur (Nom, Prenom, Email, Tel, Type, idEmployeur) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          faker.person.lastName(),
          faker.person.firstName(),
          faker.internet.email(),
          faker.phone.number(),
          faker.helpers.arrayElement(['interne', 'externe']),
          faker.number.int({ min: 1, max: 5 }),
        ]
      );
    }

    // Insérer des formations
    for (let i = 0; i < 10; i++) {
      await client.query(
        'INSERT INTO Formation (Titre, Annee, Duree, idDomaine, Budget) VALUES ($1, $2, $3, $4, $5)',
        [
          faker.lorem.words(3),
          faker.number.int({ min: 2000, max: 2025 }),
          faker.number.int({ min: 1, max: 30 }),
          faker.number.int({ min: 1, max: 5 }),
          faker.finance.amount(500, 5000, 2),
        ]
      );
    }

    console.log('Données insérées avec succès !');
    await client.end();
  } catch (err) {
    console.error('Erreur lors de l’insertion des données :', err);
  }
}

seedDatabase();
