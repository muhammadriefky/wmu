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
        Schema::table('tr_blog', function (Blueprint $table) {
            $table->string('gambar')->nullable()->after('slug');
            $table->string('kategori', 100)->nullable()->after('gambar');
            $table->string('status', 20)->default('Published')->after('kategori');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tr_blog', function (Blueprint $table) {
            $table->dropColumn(['gambar', 'kategori', 'status']);
        });
    }
};
