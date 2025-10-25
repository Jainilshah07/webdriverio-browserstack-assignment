const axios = require('axios');
require('dotenv').config();

async function translateText(titles) {
  // Return original text if it's empty or invalid
  try {
    const options = {
        method: 'POST',
        url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'rapid-translate-multi-traduction.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          from: 'es',
          to: 'en',
          q: titles
        }
      };
      
      const res = await axios.request(options);
      
      // Check if the response has the data and the translated text
      if (res.data) {
        // Log and return *only* the translated text string
        console.log('Translation response:', res.data);
        return res.data;
      } else {
        // Handle cases where the API response is not what we expect
        console.error('Translation API returned unexpected data:', res.data);
        return titles; // Return original text
      }
      
  } catch (err) {
    console.error('Translation failed:', err.response ? err.response.data : err.message);
    // return text; // Return original text on error
    return titles; // <-- FIX: Changed from 'text' to 'titles'
  }
}

module.exports = { translateText };