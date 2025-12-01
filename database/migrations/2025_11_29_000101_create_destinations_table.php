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
        Schema::create('destinations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location');
            $table->string('type');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->decimal('rating', 2, 1)->default(0);
            $table->string('duration')->nullable();
            $table->string('group_size')->nullable();
            $table->string('price')->nullable();
            $table->string('category');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('destinations');
    }
};
