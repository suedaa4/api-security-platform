const pool = require('./db');

const createTables = async () => {
  
  const queryText = `
    CREATE TABLE IF NOT EXISTS traffic_logs (
      id SERIAL PRIMARY KEY,
      ip_address VARCHAR(45) NOT NULL,
      endpoint VARCHAR(255) NOT NULL,
      status_code INT NOT NULL,
      is_blocked BOOLEAN DEFAULT FALSE,
      request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(queryText);
    console.log("traffic_logs tablosu başarıyla oluşturuldu veya zaten var.");
    process.exit(0); 
  } catch (err) {
    console.error("Tablo oluşturulurken bir hata meydana geldi:", err);
    process.exit(1); 
  }
};


createTables();