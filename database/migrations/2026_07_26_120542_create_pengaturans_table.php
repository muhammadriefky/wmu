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
        Schema::create('ms_pengaturan', function (Blueprint $table) {
            $table->id('id_pengaturan');
            $table->string('kunci', 100)->unique();
            $table->text('nilai')->nullable();
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
        Schema::dropIfExists('ms_pengaturan');
    }
};
