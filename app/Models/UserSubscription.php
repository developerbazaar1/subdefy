<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSubscription extends Model
{
    protected $table='user_subscription';
    protected $primaryKey='id';
    protected $fillable=['subscription_name', 'user_id', 'category', 'cost', 'plan', 'frequency', 'next_payment_due', 'status'];

   

}
