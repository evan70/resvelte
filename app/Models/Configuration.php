<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
    const TYPE_BOOL = 'bool';
    const TYPE_TEXT = 'text';
    const TYPE_NUMBER = 'number';

    protected $table = "configurations";

    protected $fillable = [
        "name", "value", "type", "hint", "default", "description"
    ];

    /**
     * constructor
     */
    public function __construct(array $attributes = [])
    {
        $this->table = config('system_redis.defaults.tables.configurations');

        parent::__construct($attributes);
    }

}
