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
            $table->json('keunggulan_layanan')->nullable()->after('deskripsi');
            $table->json('proyek_terkait')->nullable()->after('keunggulan_layanan');
            $table->string('cta_text')->nullable()->after('proyek_terkait');
            $table->string('cta_link')->nullable()->after('cta_text');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ms_layanan', function (Blueprint $table) {
            $table->dropColumn(['keunggulan_layanan', 'proyek_terkait', 'cta_text', 'cta_link']);
        });
    }
};
