<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Klien extends Model
{
    protected $table = 'ms_klien';
    protected $primaryKey = 'id_klien';
    protected $guarded = [];
    const CREATED_AT = 'rec_datecreated';
    const UPDATED_AT = 'rec_dateupdate';
    //
    public function proyek()
    {
        return $this->hasMany(Proyek::class, 'prk_klien', 'nama_klien');
    }
}
