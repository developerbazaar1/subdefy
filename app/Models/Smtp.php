<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Smtp extends Model
{
    protected $table='smtp';
    protected $primaryKey='id';
    protected $fillable=['mail_mailer', 'mail_port', 'mail_host', 'mail_username', 'mail_password', 'mail_encryption', 'mail_from_address', 'mail_from_name'];

    
}
