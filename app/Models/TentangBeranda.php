<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TentangBeranda extends Model
{
    use HasFactory;

    protected $table = 'tr_tentang_beranda';
    protected $primaryKey = 'id_tentang_beranda';

    protected $fillable = [
        'judul',
        'deskripsi',
        'angka_pengalaman',
        'teks_pengalaman',
        'teks_komitmen',
        'video_file',
        'video_poster'
    ];
}
