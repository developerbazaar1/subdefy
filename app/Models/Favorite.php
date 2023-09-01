<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $table='favorite';
    protected $primaryKey='id';
    protected $fillable=['subscription_name', 'user_id'];

    public function userdetails(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function subscriptiondetails(){
        return $this->belongsTo(Subscription::class,'subscription_name', 'subscriptionName');
    }
    
}
