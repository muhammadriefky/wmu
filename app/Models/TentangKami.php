<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TentangKami extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul_hero',
        'deskripsi_hero',
        'sejarah_perusahaan',
        'nilai_perusahaan',
        'struktur_organisasi_image',
    ];

    protected $casts = [
        'sejarah_perusahaan' => 'array',
        'nilai_perusahaan' => 'array',
    ];
}
