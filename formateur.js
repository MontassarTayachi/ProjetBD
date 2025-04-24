const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'formation_platform',   // à adapter
  password: '2002',
  port: 5432,
});

async function insertFormateurs(n) {
  for (let i = 0; i < n; i++) {
    const nom = faker.person.lastName();
    const prenom = faker.person.firstName();
    const email = faker.internet.email(prenom, nom);
    const tel =faker.number.bigInt({ min:10000000, max: 99999999});
    const type = faker.helpers.arrayElement(['Interne', 'Externe']);

    const login = faker.internet.domainName(prenom, nom);
    const password = "$2a$10$8AK.zYlv5Vm45Ct8drPPa.EcI/p0r2ApZ/Y./jpu.S0GvcEkXhb6i"; // mot de passe haché (ex: "password" haché avec bcrypt)
    const image = faker.image.avatar();
   
    const idEmployeur = faker.number.bigInt({ min: 1, max: 10 }); // adapte selon ta BDD
      try {
      // 1. Insérer l'utilisateur
      const utilisateurRes = await pool.query(
        `INSERT INTO utilisateur (login, password, image, id_role)
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [login, password, image, 4]
      );
      const idUser = utilisateurRes.rows[0].id;

      // 2. Insérer le formateur
      await pool.query(
        `INSERT INTO formateur (nom, prenom, email, tel, type, id_employeur, id_user)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [nom, prenom, email, tel, type, idEmployeur, idUser]
      );

      console.log(`✔ Formateur ${prenom} ${nom} créé avec utilisateur ${login}`);
    } catch (error) {
      console.error("❌ Erreur lors de l'insertion :", error);
    }
  }

  await pool.end();
}

insertFormateurs(50); // génère 10 formateurs
