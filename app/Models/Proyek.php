<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proyek extends Model
{
    protected $table = 'tr_proyek';
    protected $primaryKey = 'prk_id';
    protected $guarded = [];
    const CREATED_AT = 'rec_datecreated';
    const UPDATED_AT = 'rec_dateupdate';
    //
}
