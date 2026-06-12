const pool = require('./db');

const rateLimiterMiddleware = async (req, res, next) => {
  // Dedektif Logu 1: IP adresini ne okuyoruz?
  const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
  const endpoint = req.path;
  
  console.log(`\n--- YENİ İSTEK GELDİ ---`);
  console.log(`Gelen IP Adresi: ${ip}`);

  const LIMIT = 5; 
  const WINDOW_SECONDS = 10; 

  try {
    // 1. ADIM: Son 10 saniyedeki istekleri sayıyoruz
    const countQuery = `
      SELECT COUNT(*) FROM traffic_logs 
      WHERE ip_address = $1 
      AND request_time > NOW() - INTERVAL '${WINDOW_SECONDS} seconds'
    `;
    
    const result = await pool.query(countQuery, [ip]);
    const requestCount = parseInt(result.rows[0].count);

    // Dedektif Logu 2: Veritabanı son 10 saniyede ne buldu?
    console.log(`Son 10 saniyedeki istek sayısı: ${requestCount} (Limit: ${LIMIT})`);

    if (requestCount >= LIMIT) {
      console.log(`!!! LİMİT AŞILDI, IP ENGELLENİYOR: ${ip} !!!`);
      
      await pool.query(
        'INSERT INTO traffic_logs (ip_address, endpoint, status_code, is_blocked) VALUES ($1, $2, $3, $4)',
        [ip, endpoint, 429, true]
      );

      return res.status(429).json({
        error: "Too Many Requests",
        message: `Sistemimizi spamlıyorsunuz! Güvenlik nedeniyle ${WINDOW_SECONDS} saniye bloke edildiniz.`
      });
    }

    // Başarılı istek kaydı
    await pool.query(
      'INSERT INTO traffic_logs (ip_address, endpoint, status_code, is_blocked) VALUES ($1, $2, $3, $4)',
      [ip, endpoint, 200, false]
    );

    console.log(`İstek başarılı olarak veritabanına kaydedildi.`);
    next();

  } catch (error) {
    console.error("Rate limiter hatası:", error);
    next(); 
  }
};

module.exports = rateLimiterMiddleware;