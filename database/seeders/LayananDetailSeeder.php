<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Layanan;

class LayananDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Jasa Kontraktor Sipil
        Layanan::where('slug', 'jasa-kontraktor-sipil')->update([
            'deskripsi_lengkap' => 'Layanan kontraktor sipil kami mencakup segala kebutuhan pembangunan struktur fisik, mulai dari tahap perencanaan, persiapan lahan, hingga eksekusi pembangunan untuk skala perumahan, komersial, maupun infrastruktur publik. Kami didukung oleh tenaga ahli tersertifikasi dan peralatan modern untuk memastikan setiap proyek selesai tepat waktu, aman, dan sesuai standar.',
            'fitur_layanan' => json_encode([
                ['judul' => 'Analisis Lahan & Struktur', 'deskripsi' => 'Pengujian kelayakan tanah dan perhitungan struktur untuk keamanan bangunan jangka panjang.'],
                ['judul' => 'Material Berkualitas Tinggi', 'deskripsi' => 'Pengadaan bahan baku sesuai spesifikasi standar SNI dan standar internasional.'],
                ['judul' => 'Manajemen Proyek Efisien', 'deskripsi' => 'Pengawasan ketat untuk memastikan tidak ada keterlambatan dan pembengkakan biaya.'],
                ['judul' => 'Garansi Konstruksi', 'deskripsi' => 'Memberikan jaminan perawatan paska-pembangunan untuk kepuasan klien.']
            ]),
            'proses_kerja' => json_encode([
                ['langkah' => 'Survei & Perencanaan', 'deskripsi' => 'Tim kami akan melakukan survei lokasi dan berdiskusi mendalam untuk memahami kebutuhan spesifik proyek Anda.'],
                ['langkah' => 'Desain & Estimasi Biaya', 'deskripsi' => 'Pembuatan gambar kerja (DED) dan perhitungan Rencana Anggaran Biaya (RAB) yang transparan.'],
                ['langkah' => 'Eksekusi & Pengawasan', 'deskripsi' => 'Proses pembangunan fisik dengan pengawasan harian untuk menjaga kualitas dan target waktu.'],
                ['langkah' => 'Serah Terima (Handover)', 'deskripsi' => 'Pemeriksaan akhir bersama klien dan penyerahan bangunan siap pakai beserta dokumen garansi.']
            ]),
        ]);

        // 2. Desain Arsitektur & Perencanaan
        Layanan::where('slug', 'desain-arsitektur-dan-perencanaan')->update([
            'deskripsi_lengkap' => 'Kami menawarkan jasa desain arsitektur profesional yang menggabungkan estetika, fungsionalitas, dan efisiensi energi. Mulai dari desain konseptual hingga rendering 3D fotorealistik, kami membantu Anda memvisualisasikan bangunan impian sebelum konstruksi dimulai.',
            'fitur_layanan' => json_encode([
                ['judul' => 'Desain Konseptual & Skematik', 'deskripsi' => 'Eksplorasi ide desain yang disesuaikan dengan gaya hidup dan preferensi Anda.'],
                ['judul' => 'Visualisasi 3D (Render & Animasi)', 'deskripsi' => 'Memberikan gambaran nyata tentang hasil akhir bangunan dari berbagai sudut pandang.'],
                ['judul' => 'Detail Engineering Design (DED)', 'deskripsi' => 'Gambar teknis lengkap sebagai panduan akurat bagi pelaksana proyek.'],
                ['judul' => 'Konsultasi Perizinan', 'deskripsi' => 'Membantu persiapan dokumen untuk pengurusan Izin Mendirikan Bangunan (PBG/IMB).']
            ]),
            'proses_kerja' => json_encode([
                ['langkah' => 'Konsultasi Awal', 'deskripsi' => 'Diskusi tentang visi, kebutuhan ruang, gaya arsitektur, dan budget Anda.'],
                ['langkah' => 'Konsep & Denah', 'deskripsi' => 'Pembuatan zoning ruang dan denah dasar (layout) untuk persetujuan awal.'],
                ['langkah' => 'Pengembangan Desain 3D', 'deskripsi' => 'Eksplorasi bentuk bangunan secara 3D dan pemilihan material/warna.'],
                ['langkah' => 'Finalisasi DED & RAB', 'deskripsi' => 'Penyerahan seluruh gambar kerja teknis dan estimasi biaya konstruksi.']
            ]),
        ]);

        // 3. Renovasi Bangunan
        Layanan::where('slug', 'renovasi-bangunan')->update([
            'deskripsi_lengkap' => 'Layanan renovasi kami mencakup perbaikan minor hingga perombakan total (major renovation). Kami memberikan solusi cerdas untuk memperbarui tampilan bangunan lama Anda, memperbaiki kerusakan struktural, atau menambah ruang sesuai kebutuhan baru.',
            'fitur_layanan' => json_encode([
                ['judul' => 'Renovasi Interior & Eksterior', 'deskripsi' => 'Pembaruan fasad dan penataan ulang tata ruang dalam (layout).'],
                ['judul' => 'Perkuatan Struktur', 'deskripsi' => 'Penambahan kolom/balok untuk bangunan tua agar kembali kokoh dan aman.'],
                ['judul' => 'Peningkatan Fungsi Ruang', 'deskripsi' => 'Alih fungsi ruangan atau penambahan lantai (dak).'],
                ['judul' => 'Perbaikan Kebocoran & Utilitas', 'deskripsi' => 'Solusi tuntas untuk masalah atap bocor, kelistrikan, dan plumbing (saluran air).']
            ]),
            'proses_kerja' => json_encode([
                ['langkah' => 'Inspeksi Kondisi Bangunan', 'deskripsi' => 'Pemeriksaan menyeluruh untuk mengidentifikasi kerusakan dan potensi masalah.'],
                ['langkah' => 'Usulan Solusi & RAB', 'deskripsi' => 'Penawaran rencana perbaikan beserta rincian biayanya.'],
                ['langkah' => 'Pembongkaran (Demolition)', 'deskripsi' => 'Proses pembongkaran area yang akan direnovasi secara aman.'],
                ['langkah' => 'Pekerjaan Renovasi', 'deskripsi' => 'Pelaksanaan perbaikan dan pembaruan sesuai kesepakatan.']
            ]),
        ]);

        // 4. Pekerjaan Interior & Eksterior
        Layanan::where('slug', 'pekerjaan-interior-dan-eksterior')->update([
            'deskripsi_lengkap' => 'Hadirkan suasana baru di hunian atau tempat usaha Anda melalui layanan interior dan eksterior kami. Kami menangani pembuatan custom furniture, instalasi lantai, tata cahaya (lighting), hingga landscaping taman.',
            'fitur_layanan' => json_encode([
                ['judul' => 'Custom Furniture (Built-in)', 'deskripsi' => 'Pembuatan lemari, kitchen set, dan perabot yang presisi menyesuaikan ukuran ruangan.'],
                ['judul' => 'Plafon & Partisi', 'deskripsi' => 'Pemasangan gypsum, drop ceiling, dan partisi ruangan yang estetis.'],
                ['judul' => 'Instalasi Lantai', 'deskripsi' => 'Pemasangan keramik, granit, vinyl, hingga lantai kayu (parquet).'],
                ['judul' => 'Fasad & Landscaping', 'deskripsi' => 'Penataan taman dan pemasangan ornamen eksterior (ACP, batu alam).']
            ]),
            'proses_kerja' => json_encode([
                ['langkah' => 'Pengukuran (Opname) Ruangan', 'deskripsi' => 'Pengambilan ukuran pasti di lokasi agar material yang dipesan akurat.'],
                ['langkah' => 'Pemilihan Material', 'deskripsi' => 'Diskusi pemilihan bahan, warna, dan tekstur bersama klien.'],
                ['langkah' => 'Pabrikasi (Workshop)', 'deskripsi' => 'Pembuatan komponen interior (seperti furniture) di bengkel kerja kami.'],
                ['langkah' => 'Instalasi di Lokasi', 'deskripsi' => 'Pemasangan (fitting) seluruh komponen di lokasi dengan rapi dan bersih.']
            ]),
        ]);
    }
}
