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
        Schema::create('tentang_kamis', function (Blueprint $table) {
            $table->id();
            $table->string('judul_hero')->nullable();
            $table->text('deskripsi_hero')->nullable();
            $table->json('sejarah_perusahaan')->nullable();
            $table->json('nilai_perusahaan')->nullable();
            $table->string('struktur_organisasi_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tentang_kamis');
    }
};
