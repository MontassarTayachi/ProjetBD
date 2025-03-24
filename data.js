const { Client } = require('pg');

async function createDatabaseAndTables() {
  try {
   
    const newClient = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'gestionformationbd',
      password: '2002',
      port: 5432,
    });
    await newClient.connect();

    // Création des tables
    const queries = `
      CREATE TABLE Utilisateur (
        Id SERIAL PRIMARY KEY,
        Login VARCHAR(100) UNIQUE NOT NULL,
        Password VARCHAR(255) NOT NULL,
        idRole INT NOT NULL
      );

      CREATE TABLE Role (
        Id SERIAL PRIMARY KEY,
        Nom VARCHAR(75) NOT NULL
      );

      CREATE TABLE Profil (
        Id SERIAL PRIMARY KEY,
        Libelle VARCHAR(100) NOT NULL
      );

      CREATE TABLE Structure (
        Id SERIAL PRIMARY KEY,
        Libelle VARCHAR(100) NOT NULL
      );

      CREATE TABLE Participant (
        Id SERIAL PRIMARY KEY,
        Nom VARCHAR(100) NOT NULL,
        Prenom VARCHAR(100) NOT NULL,
        idStructure INT REFERENCES Structure(Id),
        idProfil INT REFERENCES Profil(Id),
        Email VARCHAR(100) UNIQUE NOT NULL,
        Tel VARCHAR(30) NOT NULL
      );
     CREATE TABLE Employeur (
        Id SERIAL PRIMARY KEY,
        nomEmployeur VARCHAR(100) NOT NULL
      );
      CREATE TABLE Formateur (
        Id SERIAL PRIMARY KEY,
        Nom VARCHAR(100) NOT NULL,
        Prenom VARCHAR(100) NOT NULL,
        Email VARCHAR(100) UNIQUE NOT NULL,
        Tel VARCHAR(30) NOT NULL,
        Type VARCHAR(50) NOT NULL,
        idEmployeur INT REFERENCES Employeur(Id)
      );

     

      CREATE TABLE Domaine (
        Id SERIAL PRIMARY KEY,
        Libelle VARCHAR(100) NOT NULL
      );

      CREATE TABLE Formation (
        Id SERIAL PRIMARY KEY,
        Titre VARCHAR(200) NOT NULL,
        Annee INT NOT NULL,
        Duree INT NOT NULL,
        idDomaine INT REFERENCES Domaine(Id),
        Budget DOUBLE PRECISION NOT NULL
      );
    `;

    await newClient.query(queries);
    console.log('Tables créées avec succès !');

    await newClient.end();
  } catch (err) {
    console.error('Erreur :', err);
  }
}

createDatabaseAndTables();
