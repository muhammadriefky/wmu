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
        Schema::create('tr_blog', function (Blueprint $table) {
            $table->id('id_blog');
            $table->string('judul_blog', 255);
            $table->string('slug', 255);
            $table->string('meta_deskripsi', 160)->nullable();
            $table->text('isi_konten')->nullable();
            $table->dateTime('tanggal_terbit');
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
        Schema::dropIfExists('tr_blog');
    }
};
