<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Layanan extends Model
{
    protected $table = 'ms_layanan';
    protected $primaryKey = 'id_layanan';
    protected $guarded = [];
    
    protected $casts = [
        'keunggulan_layanan' => 'array',
        'proyek_terkait' => 'array',
        'is_unggulan' => 'boolean',
    ];

    const CREATED_AT = 'rec_datecreated';
    const UPDATED_AT = 'rec_dateupdate';
    //
}
