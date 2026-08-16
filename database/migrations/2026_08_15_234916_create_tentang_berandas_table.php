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
        Schema::create('tr_tentang_beranda', function (Blueprint $table) {
            $table->id('id_tentang_beranda');
            $table->string('judul')->nullable();
            $table->text('deskripsi')->nullable();
            $table->string('angka_pengalaman')->nullable();
            $table->string('teks_pengalaman')->nullable();
            $table->text('teks_komitmen')->nullable();
            $table->string('video_file')->nullable();
            $table->string('video_poster')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tr_tentang_beranda');
    }
};
