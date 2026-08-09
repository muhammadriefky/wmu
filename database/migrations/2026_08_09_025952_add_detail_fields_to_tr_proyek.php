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
            $table->text('prk_deskripsi')->nullable()->after('prk_gambar');
            $table->text('prk_tantangan')->nullable()->after('prk_deskripsi');
            $table->text('prk_solusi')->nullable()->after('prk_tantangan');
            $table->text('prk_hasil')->nullable()->after('prk_solusi');
            $table->string('prk_luas')->nullable()->after('prk_hasil');
            $table->json('prk_galeri')->nullable()->after('prk_luas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tr_proyek', function (Blueprint $table) {
            $table->dropColumn([
                'prk_deskripsi',
                'prk_tantangan',
                'prk_solusi',
                'prk_hasil',
                'prk_luas',
                'prk_galeri'
            ]);
        });
    }
};
