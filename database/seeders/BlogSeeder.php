<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use Illuminate\Support\Str;
use Carbon\Carbon;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Blog::truncate();
        
        $now = Carbon::now();
        
        $blogs = [
            [
                'judul_blog' => 'Tren Desain Arsitektur Modern 2024',
                'kategori' => 'Desain',
                'meta_deskripsi' => 'Menjelajahi tren desain arsitektur modern yang paling diminati di tahun 2024, dari konsep minimalis hingga bangunan ramah lingkungan.',
                'isi_konten' => '<p>Tahun 2024 membawa banyak perubahan dalam dunia arsitektur, khususnya dalam mengintegrasikan bangunan dengan lingkungan alam. Beberapa tren utama meliputi penggunaan material daur ulang, desain ruang terbuka yang luas, dan pemanfaatan pencahayaan alami secara maksimal.</p><p>Selain itu, konsep <strong>Smart Home</strong> kini bukan lagi sekadar pelengkap, melainkan kebutuhan standar dalam perancangan hunian mewah dan menengah.</p>',
                'status' => 'Published'
            ],
            [
                'judul_blog' => 'Pentingnya Manajemen Proyek dalam Konstruksi Skala Besar',
                'kategori' => 'Manajemen',
                'meta_deskripsi' => 'Mengapa manajemen proyek yang baik sangat krusial untuk memastikan keberhasilan dan efisiensi biaya pada proyek konstruksi besar.',
                'isi_konten' => '<p>Proyek konstruksi skala besar selalu berhadapan dengan tiga tantangan utama: Waktu, Biaya, dan Kualitas. Tanpa manajemen proyek yang terstruktur, ketiganya sangat rentan melenceng dari rencana awal.</p><p>Penggunaan metode jalur kritis (Critical Path Method) dan teknologi BIM (Building Information Modeling) kini menjadi standar baru bagi kontraktor profesional untuk memastikan transparansi dan koordinasi antar tim di lapangan.</p>',
                'status' => 'Published'
            ],
            [
                'judul_blog' => 'Memilih Material Bangunan yang Ramah Lingkungan',
                'kategori' => 'Konstruksi',
                'meta_deskripsi' => 'Panduan memilih material bangunan yang ramah lingkungan tanpa mengorbankan kekuatan dan estetika bangunan.',
                'isi_konten' => '<p>Konstruksi hijau (Green Construction) semakin menjadi sorotan seiring meningkatnya kesadaran akan perubahan iklim. Salah satu pilar utamanya adalah pemilihan material. Penggunaan kayu bersertifikat, bambu, baja daur ulang, dan beton ramah lingkungan (eco-concrete) kini semakin luas digunakan.</p><p>Meskipun biaya awal mungkin terasa sedikit lebih tinggi, investasi pada material ramah lingkungan terbukti menurunkan biaya operasional bangunan dalam jangka panjang berkat efisiensi energi yang lebih baik.</p>',
                'status' => 'Published'
            ],
            [
                'judul_blog' => 'Tips Renovasi Rumah untuk Memaksimalkan Ruang Sempit',
                'kategori' => 'Renovasi',
                'meta_deskripsi' => 'Bagaimana menyiasati ruangan yang terbatas agar tampak lebih luas, fungsional, dan tetap estetik dengan renovasi yang tepat.',
                'isi_konten' => '<p>Tinggal di daerah perkotaan seringkali berarti harus puas dengan lahan yang terbatas. Namun, dengan perencanaan ruang (space planning) yang cerdas, rumah mungil pun bisa terasa luas.</p><p>Beberapa tips jitu meliputi: penggunaan furnitur multifungsi, mengoptimalkan penyimpanan vertikal (lemari tinggi hingga plafon), menggunakan warna cat terang, dan memperbanyak masuknya cahaya matahari ke dalam ruangan.</p>',
                'status' => 'Published'
            ]
        ];

        foreach ($blogs as $blog) {
            Blog::create([
                'judul_blog' => $blog['judul_blog'],
                'slug' => Str::slug($blog['judul_blog']),
                'kategori' => $blog['kategori'],
                'meta_deskripsi' => $blog['meta_deskripsi'],
                'isi_konten' => $blog['isi_konten'],
                'status' => $blog['status'],
                'tanggal_terbit' => $now->subDays(rand(1, 30))->format('Y-m-d H:i:s'),
                'rec_datecreated' => $now,
                'rec_dateupdate' => $now,
                'rec_usercreated' => 'System',
            ]);
        }
    }
}
