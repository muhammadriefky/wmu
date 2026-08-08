<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin Master
        User::create([
            'nama' => 'Administrator',
            'email' => '',
            'kata_sandi' => \Illuminate\Support\Facades\Hash::make('rahasia123'),
        ]);

        // Default Settings
        $settings = [
            ['kunci' => 'nama_pt', 'nilai' => 'PT Winmulyautama'],
            ['kunci' => 'alamat', 'nilai' => 'Jl. Contoh Alamat No. 123, Jakarta'],
            ['kunci' => 'telepon', 'nilai' => '021-12345678'],
            ['kunci' => 'email', 'nilai' => 'info@winmulyautama.com'],
            ['kunci' => 'wa_number', 'nilai' => '6281234567890'],
            ['kunci' => 'wa_message', 'nilai' => 'Halo Admin WMU, saya ingin bertanya.'],
            ['kunci' => 'visi', 'nilai' => 'Menjadi perusahaan terdepan di bidang konstruksi.'],
            ['kunci' => 'misi', 'nilai' => "1. Memberikan layanan terbaik.\n2. Inovasi berkelanjutan."],
        ];

        foreach ($settings as $setting) {
            \App\Models\Pengaturan::create($setting);
        }

        $this->call([
            FaqSeeder::class,
        ]);
    }
}
