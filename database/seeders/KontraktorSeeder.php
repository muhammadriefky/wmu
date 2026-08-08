<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Keunggulan;
use App\Models\Layanan;
use App\Models\Proyek;
use App\Models\Ulasan;
use Carbon\Carbon;

class KontraktorSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        // 1. Keunggulan
        Keunggulan::truncate();
        $keunggulans = [
            ['judul' => 'Pengalaman Belasan Tahun', 'deskripsi' => 'Kami telah melayani ratusan proyek konstruksi komersial dan residensial sejak tahun 2014.', 'ikon' => 'Award', 'urutan' => 1],
            ['judul' => 'Tim Profesional', 'deskripsi' => 'Didukung oleh tenaga ahli tersertifikasi seperti arsitek, insinyur, dan manajemen konstruksi.', 'ikon' => 'Users', 'urutan' => 2],
            ['judul' => 'Ketepatan Waktu', 'deskripsi' => 'Komitmen kami adalah menyelesaikan setiap proyek sesuai jadwal yang telah disepakati tanpa mengurangi kualitas.', 'ikon' => 'Clock', 'urutan' => 3],
            ['judul' => 'Harga Transparan & Kompetitif', 'deskripsi' => 'Kami menyajikan Rencana Anggaran Biaya (RAB) yang transparan, efisien, dan tanpa biaya tersembunyi.', 'ikon' => 'Tag', 'urutan' => 4],
            ['judul' => 'Material Berkualitas Tinggi', 'deskripsi' => 'Bekerja sama dengan supplier tepercaya untuk memastikan material bangunan yang tangguh dan tahan lama.', 'ikon' => 'Package', 'urutan' => 5],
            ['judul' => 'Garansi Pemeliharaan', 'deskripsi' => 'Setiap proyek dilengkapi dengan jaminan pemeliharaan purna jual untuk memastikan kepuasan Anda.', 'ikon' => 'ShieldCheck', 'urutan' => 6],
            ['judul' => 'Keselamatan Kerja (K3)', 'deskripsi' => 'Penerapan standar Keselamatan dan Kesehatan Kerja yang ketat di setiap lokasi proyek.', 'ikon' => 'HardHat', 'urutan' => 7],
            ['judul' => 'Pelayanan Responsif', 'deskripsi' => 'Dukungan layanan pelanggan dan tim lapangan yang cepat tanggap atas kebutuhan klien.', 'ikon' => 'Headphones', 'urutan' => 8],
        ];

        foreach ($keunggulans as $k) {
            Keunggulan::create($k);
        }

        // 2. Layanan
        Layanan::truncate();
        $layanans = [
            ['judul_layanan' => 'Jasa Kontraktor Sipil', 'deskripsi' => 'Pembangunan struktur utama untuk gedung, jembatan, jalan, dan infrastruktur komersial skala menengah hingga besar.', 'gambar' => 'layanan/sipil.jpg'],
            ['judul_layanan' => 'Desain Arsitektur & Perencanaan', 'deskripsi' => 'Layanan desain blueprint arsitektur yang modern, fungsional, serta mengutamakan aspek keamanan dan efisiensi ruang.', 'gambar' => 'layanan/arsitektur.jpg'],
            ['judul_layanan' => 'Renovasi Bangunan', 'deskripsi' => 'Peremajaan dan modifikasi bangunan lama menjadi lebih modern, baik untuk rumah tinggal, ruko, maupun perkantoran.', 'gambar' => 'layanan/renovasi.jpg'],
            ['judul_layanan' => 'Pekerjaan Interior & Eksterior', 'deskripsi' => 'Penataan ruang dalam dan fasad luar bangunan menggunakan material premium dan tata letak yang estetik.', 'gambar' => 'layanan/interior.jpg'],
        ];

        foreach ($layanans as $l) {
            $l['slug'] = Str::slug($l['judul_layanan']);
            $l['rec_datecreated'] = $now;
            Layanan::create($l);
        }

        // 3. Proyek
        Proyek::truncate();
        $proyeks = [
            ['judul_proyek' => 'Pembangunan Gedung Perkantoran Sudirman', 'nama_klien' => 'PT. Sudirman Investama', 'tahun_pengerjaan' => '2023'],
            ['judul_proyek' => 'Renovasi Interior Hotel Bintang 4', 'nama_klien' => 'Mulia Group Hotel', 'tahun_pengerjaan' => '2022'],
            ['judul_proyek' => 'Pembangunan Perumahan Cluster Elit', 'nama_klien' => 'Citra Land Development', 'tahun_pengerjaan' => '2024'],
            ['judul_proyek' => 'Konstruksi Pabrik Manufaktur', 'nama_klien' => 'PT. Industrial Makmur', 'tahun_pengerjaan' => '2021'],
            ['judul_proyek' => 'Infrastruktur Jalan Kawasan Industri', 'nama_klien' => 'Kawasan Industri Terpadu', 'tahun_pengerjaan' => '2023'],
        ];

        foreach ($proyeks as $p) {
            $p['slug'] = Str::slug($p['judul_proyek']);
            $p['rec_datecreated'] = $now;
            Proyek::create($p);
        }

        // 4. Ulasan
        Ulasan::truncate();
        $ulasans = [
            ['nama_pemberi' => 'Budi Santoso', 'isi_ulasan' => 'Hasil pekerjaan sangat rapi dan selesai tepat waktu. Tim sangat profesional dan komunikatif dari awal hingga akhir proyek.', 'rating_bintang' => 5, 'status_disetujui' => 1],
            ['nama_pemberi' => 'Hendrik Tan', 'isi_ulasan' => 'Rencana anggaran yang transparan sangat membantu kami mengontrol budget. Kualitas strukturnya juga kokoh.', 'rating_bintang' => 5, 'status_disetujui' => 1],
            ['nama_pemberi' => 'Ayu Lestari', 'isi_ulasan' => 'Renovasi rumah berjalan lancar. Meski ada sedikit kendala cuaca, tim cepat mencari solusi agar target tidak meleset terlalu jauh.', 'rating_bintang' => 4, 'status_disetujui' => 1],
            ['nama_pemberi' => 'PT. Makmur Sentosa', 'isi_ulasan' => 'Proyek pabrik kami dikerjakan dengan standar K3 yang sangat baik. Sangat merekomendasikan layanan kontraktor ini.', 'rating_bintang' => 5, 'status_disetujui' => 1],
        ];

        foreach ($ulasans as $u) {
            $u['rec_datecreated'] = $now;
            Ulasan::create($u);
        }
    }
}
