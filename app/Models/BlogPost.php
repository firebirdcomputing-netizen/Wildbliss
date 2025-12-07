<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'title',
        'excerpt',
        'content',
        'category',
        'author',
        'read_time',
        'status',
        'image_url',
        'tags',
    ];

    protected $casts = [
        'status' => 'string',
        'tags' => 'array',
    ];
}