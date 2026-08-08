# Aturan & Langkah Pengerjaan (Development Workflow)
**Proyek:** Website Company Profile Winmulyautama (WMU)

Dokumen ini berfungsi sebagai pedoman standar baku (SOP) bagi tim pengembang dalam mengeksekusi *coding* proyek ini dari awal hingga rilis.

---

## BAGIAN 1: Aturan Pengerjaan (Rules)

### 1. Standar Database & Model (Backend)
- **Prefix Tabel:** Wajib menggunakan awalan `ms_` untuk data master dan `tr_` untuk data transaksi.
- **Bahasa Kolom:** Kolom menggunakan bahasa Indonesia dengan format *snake_case* (contoh: `id_klien`, `judul_proyek`).
- **Audit Trail:** Kolom `rec_datecreated`, `rec_dateupdate`, `rec_usercreated`, `rec_userupdate` wajib ada di tabel.
- **Konfigurasi Eloquent:** Karena tidak memakai standar bahasa Inggris Laravel, **SETIAP MODEL** wajib memiliki deklarasi manual:
  ```php
  protected $table = 'nama_tabel';
  protected $primaryKey = 'id_tabel';
  const CREATED_AT = 'rec_datecreated';
  const UPDATED_AT = 'rec_dateupdate';
  ```
- **Automasi Tracking User:** ID pembuat (Admin) pada kolom `rec_usercreated` dan `rec_userupdate` tidak boleh di-input manual di controller. Wajib menggunakan **Model Observers** (event `creating` dan `updating`) yang mengambil data `Auth::id()`.

### 2. Standar Frontend (React + Inertia)
- **Komponen Modular:** Pecah bagian UI menjadi komponen-komponen kecil (contoh: `<Navbar />`, `<Footer />`, `<Button />`) di dalam folder `resources/js/Components`.
- **Styling:** Dilarang keras menulis *inline CSS* (contoh: `style={{ color: 'red' }}`). Wajib murni menggunakan kelas-kelas utilitas dari **Tailwind CSS**.
- **Perpindahan Halaman:** Jangan gunakan tag `<a>` HTML standar. Wajib menggunakan komponen `<Link>` bawaan dari Inertia.js agar perpindahan halaman bersifat SPA (tanpa *reload*).

### 3. Standar SEO (Advanced SEO)
- Wajib menggunakan ekstensi `<Head>` dari Inertia di setiap Halaman (Page) untuk menyisipkan *Title*, *Meta Description*, dan *Open Graph* yang dinamis.

---

## BAGIAN 2: Step by Step Pengerjaan (Milestones)

Berikut adalah urutan pengerjaan (*roadmap*) agar proyek berjalan sistematis tanpa tumpang tindih.

### FASE 1: Inisialisasi & Setup Lingkungan (Environment)
1. **Instalasi Paket Dasar:** Pasang Laravel, React, Inertia.js, dan Vite (Bisa menggunakan `Laravel Breeze` edisi React untuk *shortcut* sistem login).
2. **Konfigurasi Tailwind CSS:** Inisialisasi `tailwind.config.js` dan pastikan konfigurasi tema warna utama WMU sudah tersimpan di variabel CSS.
3. **Koneksi Database:** Konfigurasi kredensial database di file `.env`.

### FASE 2: Struktur Database & Backend Core
1. **Migrations:** Eksekusi pembuatan file `migration` untuk seluruh tabel (Dimulai dari `ms_pengaturan`, `ms_klien`, dsb lalu ke `tr_ulasan`, `tr_blog`).
2. **Models & Observers:** Buat file *Model* Eloquent beserta konfigurasi properti wajibnya (lihat Aturan 1) dan *Observer* untuk mencatat aksi User.
3. **Seeders:** Buat seeder akun `User` Admin pertama dan data bawaan untuk `ms_pengaturan` (seperti nama web, kontak kosong).

### FASE 3: Pembuatan Halaman Admin (CMS)
*Fokus membuat layar "Dapur" agar data bisa di-input.*
1. **Routing Admin:** Lindungi semua rute `/admin/*` dengan *middleware* otentikasi.
2. **Layout Admin:** Buat tata letak React khusus admin yang memiliki *Sidebar Menu* dan *Header*.
3. **Modul Pengaturan:** Buat form untuk mengubah Data Global (Footer, Visi Misi).
4. **CRUD Modul Lainnya:** Bangun antarmuka dan *Controller* untuk Tabel Klien, Tabel Mitra, Keunggulan, Layanan, Blog, dan Portofolio.
5. **Modul Ulasan:** Buat halaman untuk melihat ulasan masuk dan tombol aksi "Setujui" (Approve) atau "Tolak" (Reject).

### FASE 4: Pembuatan Tampilan Publik (Frontend Website)
*Fokus membuat layar "Etalase" yang akan dilihat pengunjung.*
1. **Layout Publik:** Buat tata letak React khusus publik (Navbar atas, Footer bawah). Tarik data dinamis dari tabel `ms_pengaturan` untuk mengisi alamat/kontak di Footer.
2. **Integrasi Halaman Beranda:** Sambungkan data dari tabel `ms_keunggulan`, `ms_klien`, `ms_mitra`, `tr_ulasan` (yang `is_approved = true`), dan `ms_faq` ke komponen UI Beranda.
3. **Halaman Dinamis:** Buat halaman detail Proyek (`/proyek/{slug}`) dan detail Blog (`/blog/{slug}`).
4. **Widget Livechat:** Pasang tombol melayang WhatsApp di pojok kanan bawah.

### FASE 5: Optimasi SEO, Keamanan & Rilis (Finalization)
1. **Penerapan Meta & Schema:** Tambahkan tag `<Head>` di seluruh *Page* React beserta data JSON-LD (Rich Snippets).
2. **Sitemap Automation:** Instal dan konfigurasikan *package* pembuat sitemap otomatis di Laravel.
3. **Testing:** Lakukan pengujian di perangkat seluler (Responsivitas) dan cek apakah SPA berjalan mulus tanpa celah keamanan.
