<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UpdateLastActivity
{
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            // Update the user's last activity time
            Auth::user()->update([
                'last_activity_at' => Carbon::now(),
            ]);
        }

        return $next($request);
    }
}
