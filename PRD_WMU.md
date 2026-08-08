# Product Requirements Document (PRD)
**Proyek:** Website Company Profile Winmulyautama (WMU)
**Tanggal:** 26 Juli 2026
**Status:** DRAFT

---

## 1. Pendahuluan

### 1.1 Tujuan Produk
Membangun website company profile yang profesional dan informatif untuk **Winmulyautama (WMU)**. Website ini berfungsi sebagai wajah digital perusahaan untuk menarik klien baru, menampilkan portofolio, dan memberikan informasi layanan. Poin krusial dari sistem ini adalah ketersediaan **Halaman Admin (CMS - Content Management System)** yang memungkinkan pihak internal WMU untuk mengelola dan memperbarui konten website secara mandiri tanpa memerlukan bantuan developer secara terus-menerus.

### 1.2 Target Pengguna
1. **Pengunjung Website (Calon Klien/Klien/Masyarakat Umum):** Mengakses website untuk mencari informasi tentang layanan, proyek, keunggulan, dan kontak perusahaan.
2. **Administrator Website (Internal WMU):** Staf yang memiliki hak akses ke *dashboard* admin untuk menambah, mengubah, atau menghapus konten website.

---

## 2. Arsitektur Informasi & Sitemap

Berdasarkan rancangan awal, struktur menu utama website meliputi:
1. **Beranda (Home)**
2. **Tentang Kami (About Us)**
3. **Layanan (Services)**
4. **Project (Portofolio)**
5. **Karir (Career)**
6. **Blog (Artikel/Berita)**

---

## 3. Rincian Fitur Halaman Beranda (Homepage)

Halaman beranda akan menjadi pusat informasi utama. Semua elemen di bawah ini **wajib** dapat diedit melalui panel Admin (Sesuai dengan penanda "Input Admin" pada flowchart).

| Komponen Beranda | Deskripsi di Frontend (Pengunjung) | Kebutuhan Panel Admin (CMS) |
| :--- | :--- | :--- |
| **Keunggulan / Nilai Tambah** | Menampilkan poin-poin penting mengapa klien harus memilih WMU. | Admin dapat menambah, mengedit teks, menghapus poin keunggulan, dan mengganti ikon/gambar pendukung. |
| **Client Kami** | Menampilkan deretan logo klien (pengguna jasa) yang pernah/sedang bekerjasama dengan WMU. | **(Modul Khusus Klien):** Data tidak dicampur dengan partner. Admin dapat mengunggah logo (JPG/PNG/SVG), menambah, mengedit, dan menghapus logo klien. |
| **Partnership** | Menampilkan deretan logo mitra perusahaan (vendor, principal, rekanan strategis). | **(Modul Khusus Partnership):** Data tidak dicampur dengan klien. Admin dapat mengunggah gambar logo, menambah, mengedit, dan menghapus logo partner. |
| **Visi & Misi** | Teks yang menjabarkan visi dan poin-poin misi perusahaan. | Admin dapat mengubah teks deskripsi Visi dan daftar Misi. |
| **Ulasan Client (Testimonial)** | Menampilkan nama klien, rating (Star Rate), dan teks ulasan/deskripsi. | - **Sistem Approval:** Terdapat fitur moderasi (Approve/Reject). Hanya ulasan yang di-*approve* yang akan "Muncul" di website.<br>- Admin dapat menginput manual (Nama, Bintang, Deskripsi) atau memverifikasi ulasan yang masuk (jika ada form input di frontend). |
| **FAQ / Pertanyaan Umum** | Daftar pertanyaan yang sering diajukan beserta jawabannya (biasanya model *accordion*/buka-tutup). | Admin dapat menambah pertanyaan & jawaban baru, mengedit, menghapus, atau mengatur urutan tampilannya. |
| **Contact / Footer** | Bagian bawah website yang berisi detail fundamental perusahaan. | Admin dapat mengubah data berikut:<br>- Nama PT<br>- Alamat/Domisili<br>- Nomor Telepon<br>- Email<br>- Legalitas (NIB, NPWP, AKTA - bisa berupa teks info atau link unduhan)<br>- Tautan akun Social Media (Instagram, LinkedIn, dll). |
| **Live Chat (Floating Action Button)** | Tombol melayang yang saat diklik akan langsung mengarahkan pengunjung ke aplikasi WhatsApp perusahaan. | Admin dapat mengganti nomor tujuan WhatsApp dan pesan *default* awal (opsional). |

---

## 4. Kebutuhan Fitur Halaman Lain (Secara Umum)

Walaupun belum dirinci di bagan, halaman lain harus mengikuti standar CMS yang sama:
- **Tentang Kami:** Admin bisa mengubah teks profil, sejarah, dan struktur organisasi.
- **Layanan:** Admin bisa menambah jenis layanan baru, mengedit deskripsi, dan menghapus layanan.
- **Project:** Admin bisa menambah galeri proyek, deskripsi proyek, klien, dan tahun pengerjaan.
- **Karir:** Admin bisa memposting lowongan kerja baru, menetapkan kriteria, dan menutup lowongan.
- **Blog:** Sistem CMS standar (Judul, Thumbnail, Editor teks/WYSIWYG, Kategori, Tanggal Terbit).

---

## 5. Spesifikasi Halaman Admin (CMS)

Untuk mendukung pengelolaan yang mudah, panel admin harus memiliki fitur:
1. **Autentikasi (Login):** Sistem login yang aman dengan *username* dan *password*.
2. **Dashboard Overview:** Ringkasan statistik (misal: jumlah blog, jumlah project, ulasan menunggu approval).
3. **Manajemen Konten Beranda:** Menu khusus untuk mengatur section-section di beranda (Hero/Banner, Keunggulan, **Klien** (Menu terpisah), **Partnership** (Menu terpisah), Testimoni, FAQ).
4. **Pengaturan Global (Settings):** Untuk mengubah info perusahaan di Footer, link Social Media, dan nomor kontak WA.
5. **Media Library:** Tempat terpusat untuk mengelola gambar-gambar yang diunggah (Logo, Banner, Foto Project).

---

## 6. Kebutuhan Non-Fungsional

1. **Responsif (Mobile-Friendly):** Tampilan website harus optimal baik saat dibuka di Desktop, Tablet, maupun Smartphone.
2. **Performa (Loading Speed):** Gambar/logo klien harus dioptimasi agar website tidak berat saat diakses.
3. **SEO (Search Engine Optimization):** Struktur HTML (H1, H2, Meta Description) harus ramah terhadap Google Search agar mudah ditemukan.
4. **Keamanan:** Proteksi terhadap *Brute Force* login di panel admin, sanitasi form input, dan penggunaan sertifikat SSL (HTTPS).

---

## 7. Desain & Branding (UI/UX Guidelines)

Untuk menjaga konsistensi identitas visual perusahaan, antarmuka (*user interface*) website wajib mematuhi panduan palet warna berikut. Warna-warna ini nantinya akan diintegrasikan ke dalam konfigurasi tema bawaan *Tailwind CSS* (`tailwind.config.js`).

- **Primary Dark (Biru Gelap): `#032F40`**
  *Fungsi:* Warna dominan untuk teks judul (*heading*), warna latar belakang bagian *Header/Navbar*, *Footer*, atau area *section* blok utama yang elegan.
- **Primary Accent (Hijau Terang): `#00BF62`**
  *Fungsi:* Warna aksen utama untuk menarik perhatian (*Call to Action*). Digunakan pada elemen interaktif seperti *Button* (Tombol), tautan teks (*Link*), ikon sorotan, atau elemen dekoratif.
- **Neutral / Base (Putih): `#FFFFFF`**
  *Fungsi:* Warna dasar (*Background*) utama halaman untuk memberikan ruang baca yang bersih (*clean*), serta digunakan sebagai warna teks utama jika ditempatkan di atas latar gelap (seperti di atas `#032F40` atau `#00BF62`).

---

> [!TIP]
> **Teknologi (Tech Stack) Utama yang Dipilih:**
> - **Backend / API / CMS:** Laravel
> - **Frontend (User Interface):** React.js + Tailwind CSS
> - **Integrator (Penghubung):** Inertia.js
> 
> *Alasan Penggunaan:* Stack **Laravel + React (via Inertia.js)** memungkinkan pembuatan website bergaya Single Page Application (SPA) di mana transisi antar halaman terasa instan dan modern seperti aplikasi native, tanpa perlu repot membangun project API terpisah. Kodingan frontend (React) dan backend (Laravel) tetap berada dalam 1 folder project yang sama.
