<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KlienSeeder extends Seeder
{
    public function run(): void
    {
        $kliens = [
            [
                'nama_klien' => 'WIKA',
                'email' => 'contact@wika.co.id',
                'telepon' => '0211234567',
                'kategori' => 'Industrial',
                'logo' => 'https://upload.wikimedia.org/wikipedia/id/thumb/2/23/Wijaya_Karya_Logo.svg/320px-Wijaya_Karya_Logo.svg.png',
                'urutan' => 1,
                'status_aktif' => 1
            ],
            [
                'nama_klien' => 'Sinarmas Land',
                'email' => 'contact@sinarmasland.com',
                'telepon' => '0217654321',
                'kategori' => 'Commercial Building',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sinarmas_Land_Logo.svg/320px-Sinarmas_Land_Logo.svg.png',
                'urutan' => 2,
                'status_aktif' => 1
            ],
            [
                'nama_klien' => 'Astra',
                'email' => 'contact@astra.co.id',
                'telepon' => '0219876543',
                'kategori' => 'Corporate Office',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Astra_International_logo.svg/320px-Astra_International_logo.svg.png',
                'urutan' => 3,
                'status_aktif' => 1
            ],
            [
                'nama_klien' => 'Lippo Karawaci',
                'email' => 'contact@lippo.com',
                'telepon' => '0211112222',
                'kategori' => 'Commercial Building',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lippo_Group.svg/320px-Lippo_Group.svg.png',
                'urutan' => 4,
                'status_aktif' => 1
            ],
            [
                'nama_klien' => 'Adhi Karya',
                'email' => 'contact@adhi.co.id',
                'telepon' => '0212223333',
                'kategori' => 'Public Facility',
                'logo' => 'https://upload.wikimedia.org/wikipedia/id/thumb/a/ae/Adhi_Karya_logo.svg/320px-Adhi_Karya_logo.svg.png',
                'urutan' => 5,
                'status_aktif' => 1
            ]
        ];

        foreach ($kliens as $klien) {
            \App\Models\Klien::firstOrCreate(
                ['nama_klien' => $klien['nama_klien']],
                $klien
            );
        }
    }
}
