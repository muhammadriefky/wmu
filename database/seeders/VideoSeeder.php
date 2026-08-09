<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $videos = [
            [
                'judul_video' => 'Proses Pembangunan Proyek Gedung Perkantoran',
                'durasi' => '02:25',
                'gambar' => '', // Empty for default image in frontend
                'url_video' => '#',
                'status' => 'Aktif',
                'rec_datecreated' => Carbon::now(),
                'rec_dateupdate' => Carbon::now(),
            ],
            [
                'judul_video' => 'Manajemen Proyek Secara Profesional',
                'durasi' => '01:45',
                'gambar' => '',
                'url_video' => '#',
                'status' => 'Aktif',
                'rec_datecreated' => Carbon::now(),
                'rec_dateupdate' => Carbon::now(),
            ],
            [
                'judul_video' => 'Komitmen Kami terhadap Keselamatan Kerja',
                'durasi' => '02:12',
                'gambar' => '',
                'url_video' => '#',
                'status' => 'Aktif',
                'rec_datecreated' => Carbon::now(),
                'rec_dateupdate' => Carbon::now(),
            ],
            [
                'judul_video' => 'Hasil Konstruksi dengan Kualitas Terbaik',
                'durasi' => '02:42',
                'gambar' => '',
                'url_video' => '#',
                'status' => 'Aktif',
                'rec_datecreated' => Carbon::now(),
                'rec_dateupdate' => Carbon::now(),
            ]
        ];

        DB::table('tr_video')->insert($videos);
    }
}
