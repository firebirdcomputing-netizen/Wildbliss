<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Accommodation extends Model
{
    use HasUuids;
    protected $fillable = [
        'name',
        'location',
        'rating',
        'description',
        'website',
        'image_url',
    ];

    protected $casts = [
        'rating' => 'decimal:1',
    ];
}
