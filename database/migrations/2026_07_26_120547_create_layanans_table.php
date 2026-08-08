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
        Schema::create('ms_layanan', function (Blueprint $table) {
            $table->id('id_layanan');
            $table->string('judul_layanan', 255);
            $table->string('slug', 255);
            $table->text('deskripsi')->nullable();
            $table->string('gambar', 255)->nullable();
            $table->timestamp('rec_datecreated')->nullable();
            $table->timestamp('rec_dateupdate')->nullable();
            $table->string('rec_usercreated', 50)->nullable();
            $table->string('rec_userupdate', 50)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ms_layanan');
    }
};
