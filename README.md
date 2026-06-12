Smart API Rate Limiting & Abuse Detection Platform 🛡️
Bu proje, API'leri kötü niyetli trafikten, bot saldırılarından ve spam isteklerden korumak amacıyla geliştirilmiş, Node.js ve PostgreSQL tabanlı akıllı bir oran sınırlama (Rate Limiting) ve kötüye kullanım tespit platformudur.

Proje, basit bir CRUD (ekleme/silme) mantığının ötesinde; backend mimarisi, veritabanı performans yönetimi, zaman serisi sorguları ve API güvenliği standartları dikkate alınarak tasarlanmıştır.

🚀 Öne Çıkan Özellikler
Zaman Pencereli Rate Limiting: Kullanıcıların veya botların belirli bir zaman diliminde (örn. 10 saniye) yapabileceği maksimum istek sayısı PostgreSQL üzerinde optimize edilmiş zaman sorgularıyla denetlenir.
Kötüye Kullanım Tespiti (Abuse Detection): Limiti aşan şüpheli IP adresleri otomatik olarak tespit edilir, istekleri asıl API'ye ulaşmadan engellenir ve 429 Too Many Requests hata koduyla bloke edilir.
Asenkron Trafik Loglama: Gelen her istek (başarılı veya engellenen), analitik veri oluşturmak üzere arka planda sessizce PostgreSQL veritabanına kaydedilir.
Güvenli Altyapı: Hassas veritabanı bilgileri ve port ayarları .env dosyası ile güvenli bir şekilde yönetilir.
🛠️ Kullanılan Teknolojiler
Backend: Node.js, Express.js
Veritabanı: PostgreSQL
Geliştirici Araçları: pg (PostgreSQL Client), dotenv, nodemon
📐 Mimari ve Çalışma Mantığı
Platform, gelen istekleri ana veritabanı işlemlerine yük bindirmeden önce bir ara yazılım (Middleware) süzgecinden geçirir: İstemci (Client) → Express Sunucu → [ Rate Limiter Middleware ] ↓ PostgreSQL (Son 10sn Kontrolü) ↓ (Limit Aşılmadıysa) → Ana API Endpoint'i (Limit Aşıldıysa) → 429 Too Many Requests
