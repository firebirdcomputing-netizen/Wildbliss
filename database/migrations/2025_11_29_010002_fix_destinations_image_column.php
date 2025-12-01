<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('destinations');
        
        Schema::create('destinations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('location');
            $table->string('type');
            $table->text('description')->nullable();
            $table->text('info')->nullable();
            $table->text('image')->nullable(); // Changed to TEXT
            $table->decimal('rating', 2, 1)->default(0);
            $table->string('duration')->nullable();
            $table->string('group_size')->nullable();
            $table->string('category');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('destinations');
    }
};