<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'pertanyaan' => 'Apakah WMU menyediakan layanan konsultasi desain dan perencanaan?',
                'jawaban' => 'Tentu! Tim arsitek dan teknisi kami siap membantu Anda mulai dari tahap ide, konsultasi desain, perencanaan anggaran (RAB), hingga eksekusi pembangunan fisik.',
                'urutan' => 1,
                'status_aktif' => 1,
            ],
            [
                'pertanyaan' => 'Bagaimana sistem pembayaran untuk pengerjaan proyek konstruksi?',
                'jawaban' => 'Sistem pembayaran kami menggunakan skema termin (pembayaran bertahap) berdasarkan progres fisik di lapangan. Skema ini sangat fleksibel dan akan disepakati bersama dalam surat perjanjian kontrak kerja.',
                'urutan' => 2,
                'status_aktif' => 1,
            ],
            [
                'pertanyaan' => 'Apakah hasil pekerjaan pembangunan atau renovasi memiliki garansi?',
                'jawaban' => 'Ya, kami selalu memberikan masa garansi atau masa pemeliharaan (retensi) setelah proyek diserahterimakan. Durasi garansi bervariasi antara 3 hingga 6 bulan tergantung jenis dan skala proyek.',
                'urutan' => 3,
                'status_aktif' => 1,
            ],
            [
                'pertanyaan' => 'Berapa lama estimasi waktu pengerjaan untuk sebuah proyek?',
                'jawaban' => 'Waktu pengerjaan sangat bervariasi bergantung pada skala proyek, kondisi lokasi, dan cuaca. Namun, kami selalu membuat kurva-S (jadwal kerja) yang terstruktur agar proyek selesai tepat waktu sesuai kontrak.',
                'urutan' => 4,
                'status_aktif' => 1,
            ],
            [
                'pertanyaan' => 'Apakah WMU bisa menerima pengerjaan proyek di luar wilayah operasional utama?',
                'jawaban' => 'Kami dapat melayani proyek di berbagai kota di Indonesia. Silakan hubungi tim kami untuk mendiskusikan lokasi proyek Anda dan kami akan memberikan penawaran serta analisis logistik yang tepat.',
                'urutan' => 5,
                'status_aktif' => 1,
            ],
        ];

        foreach ($faqs as $faq) {
            \App\Models\Faq::create($faq);
        }
    }
}
