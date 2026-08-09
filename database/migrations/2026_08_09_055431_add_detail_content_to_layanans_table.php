<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ms_layanan', function (Blueprint $table) {
            $table->text('deskripsi_lengkap')->nullable()->after('deskripsi');
            $table->json('fitur_layanan')->nullable()->after('deskripsi_lengkap');
            $table->json('proses_kerja')->nullable()->after('fitur_layanan');
            $table->string('gambar_detail')->nullable()->after('proses_kerja');
        });
    }

    public function down(): void
    {
        Schema::table('ms_layanan', function (Blueprint $table) {
            $table->dropColumn(['deskripsi_lengkap', 'fitur_layanan', 'proses_kerja', 'gambar_detail']);
        });
    }
};
