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
            $table->string('email')->nullable()->after('nama_klien');
            $table->string('telepon')->nullable()->after('email');
            $table->boolean('status_aktif')->default(1)->after('urutan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ms_klien', function (Blueprint $table) {
            $table->dropColumn(['email', 'telepon', 'status_aktif']);
        });
    }
};
