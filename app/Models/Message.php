<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'name',
        'email',
        'contact_number',
        'adults',
        'children',
        'subject',
        'message',
        'status'
    ];

    const STATUS_UNREAD = 'unread';
    const STATUS_READ = 'read';
    const STATUS_REPLIED = 'replied';
}
