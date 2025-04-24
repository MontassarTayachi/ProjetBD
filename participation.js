const { Pool } = require('pg');
const { faker } = require('@faker-js/faker');
const dayjs = require('dayjs');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'formation_platform', // à adapter si besoin
  password: '2002',
  port: 5432,
});

// Récupère tous les participants
async function getParticipantIds() {
  const res = await pool.query('SELECT id FROM participant');
  return res.rows.map(row => row.id);
}

// Récupère toutes les formations avec leurs heures restantes
async function getFormationData() {
  const res = await pool.query('SELECT id, nb_heures FROM formation');
  return res.rows;
}

async function insertParticipation(participantId, formation) {
  // Gère le cas où nb_heures_restantes est nul ou trop petit
  const heuresRestantes = formation.nb_heures ;
  const nombreHeures =heuresRestantes - faker.number.int({ max: heuresRestantes*0.5 , min: 1 });
  const date_inscription = faker.date.between({ from: '2024-04-11', to: '2025-04-18' });

  const query = `
    INSERT INTO participation (participant_id, formation_id, date_inscription, nombre_heures)
    VALUES ($1, $2, $3, $4)
  `;


  try {
    await pool.query(query, [
      participantId,
      formation.id,
      dayjs(date_inscription).format('YYYY-MM-DDTHH:mm:ss'),
      nombreHeures,
    ]);
    console.log(`✅ Participation ajoutée : participant ${participantId}, formation ${formation.id}`);
  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion :', error.message);
  }
}

async function seedParticipations() {
  const participantIds = await getParticipantIds();
  const formations = await getFormationData();

  for (let i = 0; i < 1000; i++) {
    const participantId = faker.helpers.arrayElement(participantIds);
    const formation = faker.helpers.arrayElement(formations);

    await insertParticipation(participantId, formation);
  }

  await pool.end();
  console.log('✅ Insertion terminée !');
}

seedParticipations();
