# Panduan Konfigurasi SEO Tingkat Lanjut (Advanced SEO)
**Proyek:** Website Company Profile Winmulyautama (WMU)

---

## 1. Struktur URL (SEO-Friendly URLs)
Setiap halaman konten dinamis (seperti Artikel Blog, Detail Layanan, atau Detail Proyek) **wajib** menggunakan *slug* (teks ramah URL berformat strip) alih-alih ID angka.
- **Buruk:** `https://winmulyautama.com/blog/12`
- **Bagus:** `https://winmulyautama.com/blog/pentingnya-layanan-kami`

*Implementasi:* Kolom `slug` harus ditambahkan ke tabel database untuk entitas yang memiliki halaman detail tersendiri.

## 2. Dynamic Meta Tags & Open Graph (OG)
Karena kita menggunakan React (Inertia.js), kita akan menggunakan komponen khusus (seperti `<Head>` dari Inertia) untuk memastikan Meta Tags berubah secara dinamis sesuai halaman yang dibuka pengunjung.
- **Title Tag:** Unik per halaman (maks. 60 karakter). Format standar: `Judul Halaman - Winmulyautama`.
- **Meta Description:** Ringkasan halaman (maks. 160 karakter). Sangat penting untuk *Click-Through Rate* (CTR) di Google.
- **Open Graph (og:title, og:image, og:description):** Agar saat link website dibagikan ke WhatsApp, LinkedIn, atau Facebook, akan muncul *preview* gambar (thumbnail) dan teks secara rapi (bukan hanya link kosong).

## 3. Peta Situs (Sitemap.xml) Dinamis
Sitemap membantu Google Bot mengindeks (merayapi) seluruh isi website dengan cepat dan akurat.
Kita akan menggunakan *package* eksternal di Laravel (misal: `spatie/laravel-sitemap`) untuk men-*generate* file `sitemap.xml` secara otomatis, misal setiap ada artikel blog baru.
- **Isi Sitemap:** `/` (Beranda), `/tentang-kami`, `/layanan`, `/proyek`, `/karir`, `/blog`, dan **seluruh URL dinamis** dari masing-masing artikel blog dan proyek.

## 4. Robots.txt
Akan disiapkan file `robots.txt` di direktori `public` dengan konfigurasi:
- Mengizinkan semua *bot search engine* menelusuri isi website (`Allow: /`).
- **Memblokir** akses *bot* pencari ke sistem internal/halaman Admin Panel demi keamanan (`Disallow: /admin/*`).
- Mencantumkan link ke Sitemap (`Sitemap: https://winmulyautama.com/sitemap.xml`).

## 5. Schema Markup (JSON-LD) - *Rich Snippets*
Ini adalah teknik "Advanced SEO" untuk memberitahu Google secara eksplisit (dalam format bahasa mesin) tentang detail konten.
- **Halaman Beranda:** Menggunakan skema `Organization` (menjabarkan Logo, Kontak, Link Sosial Media secara kode).
- **Halaman Blog:** Menggunakan skema `Article` (Penulis, Tanggal Terbit, Gambar Cover).
- **Halaman FAQ:** Menggunakan skema `FAQPage` (Agar pertanyaan dan jawaban bisa langsung muncul di hasil pencarian Google!).
- *Implementasi:* Data JSON ini akan di-*inject* ke dalam tag `<script type="application/ld+json">` di bagian `<head>` melalui *controller* Laravel/Inertia.

## 6. Canonical URLs
Untuk mencegah masalah duplikasi konten (misal: URL dengan parameter `?fbclid=xxx` dianggap sebagai halaman baru yang menduplikasi konten asli), kita akan menyisipkan tag `<link rel="canonical" href="URL_ASLI">` di setiap halaman web.

## 7. Optimasi Kecepatan Media (Technical SEO)
- Gambar klien, proyek, dan *banner* wajib dikonversi (di-*compress*) dan disajikan dalam format **WebP** yang berukuran kecil namun berkualitas tinggi.
- Penggunaan atribut `loading="lazy"` pada gambar yang berada di luar layar pandangan utama (*below the fold*) agar *website* memuat teksnya terlebih dahulu.

---

> [!IMPORTANT]
> **Kebutuhan Database Tambahan untuk SEO:**
> Berdasarkan strategi SEO mutakhir di atas, tabel Database harus sedikit dimodifikasi. Saya akan memperbarui file `Database_Schema.md` untuk menambahkan kolom:
> - Kolom `slug` pada tabel `tr_blog`, `tr_proyek`, dan `ms_layanan`.
> - Kolom `meta_deskripsi` khusus pada tabel `tr_blog` agar Admin bisa mengatur kalimat tayang di Google secara *custom*.
