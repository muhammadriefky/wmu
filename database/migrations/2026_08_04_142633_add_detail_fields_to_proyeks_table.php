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
            $table->string('gambar')->nullable()->after('tahun_pengerjaan');
            $table->string('kategori')->nullable()->after('gambar');
            $table->string('status')->default('Draft')->after('kategori');
            $table->boolean('ditampilkan')->default(false)->after('status');
            $table->boolean('is_unggulan')->default(false)->after('ditampilkan');
            $table->integer('views')->default(0)->after('is_unggulan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tr_proyek', function (Blueprint $table) {
            $table->dropColumn(['gambar', 'kategori', 'status', 'ditampilkan', 'is_unggulan', 'views']);
        });
    }
};
