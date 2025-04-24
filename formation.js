const { faker } = require('@faker-js/faker');
const { Pool } = require('pg');
const {data}= require("./Udemy Courses");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'formation_platform',   // à adapter
    password: '2002',
    port: 5432,
  });
  

async function getExistingIds(tableName) {
  const res = await pool.query(`SELECT id FROM ${tableName}`);
  return res.rows.map(row => row.id);
}

async function insertFormations() {
  const formateurIds = await getExistingIds('formateur');
  const domaineIds = await getExistingIds('domaine');

  if (formateurIds.length === 0 || domaineIds.length === 0) {
    console.error("❌ Aucune donnée dans formateur ou domaine.");
    return;
  }
  
  await Promise.all(data.map(async (formation) => {
    const titre = formation.Title;
    const annee = faker.date.between({ from: '2024-01-01', to: '2025-04-01' });
    const budget = faker.finance.amount(1000, 10000, 2);
    const nbHeures = faker.number.int({ min: 10, max: 100 });
    const nbHeuresRestantes = 0;
    const idDomaine = faker.helpers.arrayElement(domaineIds);
    const idFormateur = faker.helpers.arrayElement(formateurIds);
    const imageUrl = formation.Image;
  
    try {
      await pool.query(
        `INSERT INTO formation 
          (titre, année, budget, nb_heures, nb_heures_restantes, id_domaine, id_formateur, image_url) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [titre, annee, budget, nbHeures, nbHeuresRestantes, idDomaine, idFormateur, imageUrl]
      );
      console.log(`✔ Formation "${titre}" ajoutée`);
    } catch (error) {
      console.error("❌ Erreur d’insertion :", error.message);
    }
  }));

  await pool.end();
}

insertFormations(); // ← Génère 20 formations

