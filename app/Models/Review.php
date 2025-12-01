<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Review extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'email',
        'rating',
        'review',
        'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];

    public $incrementing = false;
    protected $keyType = 'string';
}
