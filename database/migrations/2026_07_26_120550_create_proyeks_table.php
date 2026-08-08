<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tr_proyek', function (Blueprint $table) {
            $table->id('id_proyek');
            $table->string('judul_proyek', 255);
            $table->string('slug', 255);
            $table->string('nama_klien', 255);
            $table->string('tahun_pengerjaan', 4);
            $table->timestamp('rec_datecreated')->nullable();
            $table->timestamp('rec_dateupdate')->nullable();
            $table->string('rec_usercreated', 50)->nullable();
            $table->string('rec_userupdate', 50)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tr_proyek');
    }
};
