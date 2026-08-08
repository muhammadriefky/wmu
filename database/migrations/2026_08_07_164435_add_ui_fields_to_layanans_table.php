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
        Schema::table('ms_layanan', function (Blueprint $table) {
            $table->string('kategori', 100)->nullable()->after('judul_layanan');
            $table->string('status', 20)->default('Published')->after('kategori');
            $table->boolean('is_unggulan')->default(false)->after('status');
            $table->integer('views')->default(0)->after('is_unggulan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ms_layanan', function (Blueprint $table) {
            $table->dropColumn(['kategori', 'status', 'is_unggulan', 'views']);
        });
    }
};
