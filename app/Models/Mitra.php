<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mitra extends Model
{
    protected $table = 'ms_mitra';
    protected $primaryKey = 'id_mitra';
    protected $guarded = [];
    const CREATED_AT = 'rec_datecreated';
    const UPDATED_AT = 'rec_dateupdate';
    //
}
