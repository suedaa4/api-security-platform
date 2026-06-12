const express = require('express');
const pool = require('./db');
const rateLimiter = require('./rateLimiter'); // Yeni ekledik
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// rateLimiter middleware'ini buraya parametre olarak ekledik. 
// Artık bu endpoint'e gelen herkes önce o süzgeçten geçecek.
app.get('/api/resource', rateLimiter, (req, res) => {
  res.json({ 
    status: "Success", 
    message: "Tebrikler! Gizli veriye başarıyla eriştiniz." 
  });
});

app.listen(PORT, () => {
  console.log(`Sunucumuz http://localhost:${PORT} adresinde çalışıyor.`);
});