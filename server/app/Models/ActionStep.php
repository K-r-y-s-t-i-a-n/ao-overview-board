<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActionStep extends Model
{
    use HasFactory;

    public function action()
    {
        return $this->belongsTo(Action::class);
    }
}
