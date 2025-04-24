const fetch = require('node-fetch');
const { data } = require('./Udemy Courses'); // Ton fichier contenant le tableau original
const fs = require('fs');

async function checkImage(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function filterValidCourses() {
  const validCourses = [];

  for (const course of data) {
    const isValid = await checkImage(course.Image);
    if (isValid) {
      validCourses.push(course);
    } else {
      console.log(`❌ Image invalide pour: ${course.Title}`);
    }
  }

  // Sauvegarder les données filtrées dans un nouveau fichier
  fs.writeFileSync(
    'filteredCourses.js',
    `export const data = ${JSON.stringify(validCourses, null, 2)};`
  );

  console.log(`✅ ${validCourses.length} formations valides sauvegardées dans filteredCourses.js`);
}

filterValidCourses();
