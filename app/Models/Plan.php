<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $table='subscription_plan';
    protected $primaryKey='id';
    protected $fillable=['subscriptionName', 'region', 'planName', 'defaultCost', 'defaultBillingCycle', 'commitment', 'subscription_id'];
}
