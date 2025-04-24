const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');

// Connexion à PostgreSQL
const pool = new Pool({
  user: 'postgres',       // remplace par ton utilisateur PostgreSQL
  host: 'localhost',
  database: 'formation_platform', // remplace par le nom de ta base
  password: '2002', // remplace par ton mot de passe
  port: 5432,
});

// Fonction pour insérer un participant
async function insertParticipant(n) {
  for (let i = 0; i < n; i++) {
    const nom = faker.person.lastName();
    const prenom = faker.person.firstName();
    const email = faker.internet.email(prenom, nom);
    const tel = faker.number.bigInt({ min:10000000, max: 99999999});

    const idStructure = faker.number.bigInt({ min: 1, max: 5 }); // à adapter
    const idProfil = faker.number.bigInt({ min: 1, max: 5 });    // à adapter
    console.log(`Participant ${i + 1} : ${prenom} ${nom}, email: ${email}, tel: ${tel}, idStructure: ${idStructure}, idProfil: ${idProfil}`);
    try {
      await pool.query(
        `INSERT INTO participant (nom, prenom, email, tel, id_structure, id_profil)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [nom, prenom, email, tel, idStructure, idProfil]
      );
      console.log(`✔ Participant ${prenom} ${nom} inséré`);
    } catch (err) {
      console.error('❌ Erreur :', err);
    }
  }

  await pool.end();
}

// Lancer l'insertion de 20 participants
insertParticipant(100);
