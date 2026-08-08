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
        Schema::table('tr_proyek', function (Blueprint $table) {
            $table->renameColumn('id_proyek', 'prk_id');
            $table->renameColumn('judul_proyek', 'prk_judul');
            $table->renameColumn('slug', 'prk_slug');
            $table->renameColumn('nama_klien', 'prk_klien');
            $table->renameColumn('tahun_pengerjaan', 'prk_tahun');
            $table->renameColumn('gambar', 'prk_gambar');
            $table->renameColumn('kategori', 'prk_kategori');
            $table->renameColumn('status', 'prk_status');
            $table->renameColumn('ditampilkan', 'prk_is_tampil');
            $table->renameColumn('is_unggulan', 'prk_is_unggulan');
            $table->renameColumn('views', 'prk_dilihat');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tr_proyek', function (Blueprint $table) {
            $table->renameColumn('prk_id', 'id_proyek');
            $table->renameColumn('prk_judul', 'judul_proyek');
            $table->renameColumn('prk_slug', 'slug');
            $table->renameColumn('prk_klien', 'nama_klien');
            $table->renameColumn('prk_tahun', 'tahun_pengerjaan');
            $table->renameColumn('prk_gambar', 'gambar');
            $table->renameColumn('prk_kategori', 'kategori');
            $table->renameColumn('prk_status', 'status');
            $table->renameColumn('prk_is_tampil', 'ditampilkan');
            $table->renameColumn('prk_is_unggulan', 'is_unggulan');
            $table->renameColumn('prk_dilihat', 'views');
        });
    }
};
