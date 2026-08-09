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
        Schema::table('ms_klien', function (Blueprint $table) {
            $table->string('kategori')->nullable()->after('nama_klien');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ms_klien', function (Blueprint $table) {
            $table->dropColumn('kategori');
        });
    }
};
