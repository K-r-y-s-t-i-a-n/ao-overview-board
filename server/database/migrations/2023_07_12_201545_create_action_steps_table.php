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
        Schema::create('action_steps', function (Blueprint $table) {
            $table->id();
            $table->string('added_by');
            $table->text('text');
            $table->timestamps();
            $table->foreignId('action_id')->constrained('actions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('action_steps');
    }
};
