<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $table = 'tr_video';
    protected $primaryKey = 'id_video';
    public $timestamps = false;

    protected $fillable = [
        'judul_video',
        'durasi',
        'sumber',
        'gambar',
        'url_video',
        'file_video',
        'status',
        'rec_datecreated',
        'rec_dateupdate',
        'rec_usercreated',
        'rec_userupdate',
    ];
}
